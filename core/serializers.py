from django.db import models
from rest_framework import serializers
from .models import Company, Project, Story, Ticket



class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def validate_status(self, value):
        allowed = [choice[0] for choice in Ticket.STATUS_CHOICES]
        if value not in allowed:
            raise serializers.ValidationError(f"Invalid status. Allowed: {allowed}")
        return value

    def validate(self, attrs):
        # ejemplo exigir título al crear ticket
        if self.instance is None and not attrs.get('title'):
            raise serializers.ValidationError({"title": "El ticket debe tener un título."})
        return attrs

# -------------------------
# StorySerializer
# -------------------------
class StorySerializer(serializers.ModelSerializer):
    # mostrar tickets asociados (solo lectura)
    tickets = TicketSerializer(many=True, read_only=True)

    # campo de escritura opcional para crear el primer ticket en la misma petición
    first_ticket = serializers.DictField(write_only=True, required=False)

    class Meta:
        model = Story
        fields = ('id', 'project', 'title', 'description', 'tickets', 'first_ticket')
        read_only_fields = ('id',)

    def validate(self, data):
        # Si es creación (POST) obligamos a que venga first_ticket (según requisito)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # Revisamos initial_data porque first_ticket es write_only
            if 'first_ticket' not in self.initial_data:
                raise serializers.ValidationError({
                    "first_ticket": "Al crear una historia, debe incluirse el primer ticket (campo: first_ticket)."
                })
            # Validar que first_ticket tenga al menos un title
            first = self.initial_data.get('first_ticket') or {}
            if not first.get('title'):
                raise serializers.ValidationError({
                    "first_ticket": "El primer ticket debe incluir al menos 'title'."
                })
        return data

    def create(self, validated_data):
        # first_ticket (si existe)
        first_ticket = self.initial_data.get('first_ticket', None)
        # quitamos del validated_data si está (no siempre estará)
        if 'first_ticket' in validated_data:
            validated_data.pop('first_ticket')

        # creamos story y el ticket en una transacción atómica
        with transaction.atomic():
            story = Story.objects.create(**validated_data)
            if first_ticket:
                # campos del ticket
                ticket_data = {
                    'story': story,
                    'title': first_ticket.get('title'),
                    'description': first_ticket.get('description', ''),
                    'comments': first_ticket.get('comments', ''),
                    'status': first_ticket.get('status', 'ACTIVE')
                }
                #  status antes de crear
                allowed = [c[0] for c in Ticket.STATUS_CHOICES]
                if ticket_data['status'] not in allowed:
                    raise serializers.ValidationError({
                        "first_ticket": f"Estado inválido. Estados permitidos: {allowed}"
                    })
                Ticket.objects.create(**ticket_data)
        return story

# -------------------------
# ProjectSerializer
# -------------------------
class ProjectSerializer(serializers.ModelSerializer):
    # historias como lectura anidada
    stories = StorySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'company', 'name', 'description', 'stories')
        read_only_fields = ('id',)

# -------------------------
# CompanySerializer
# -------------------------
class CompanySerializer(serializers.ModelSerializer):
    # proyectos (read-only)
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ('id', 'name', 'nit', 'phone', 'address', 'email', 'projects')
        read_only_fields = ('id',)