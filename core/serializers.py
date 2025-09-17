from django.db import models
from rest_framework import serializers
from .models import Company, Project, Story, Ticket, CustomUser
from django.db import transaction


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'company']

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            company=validated_data['company']
        )
        user.set_password(validated_data['password'])  # Encriptar contraseña
        user.save()
        return user
    
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
        #  exigir título al crear ticket
        if self.instance is None and not attrs.get('title'):
            raise serializers.ValidationError({"title": "El ticket debe tener un título."})
        return attrs

# -------------------------
# StorySerializer
# -------------------------
class StorySerializer(serializers.ModelSerializer):
    tickets = TicketSerializer(many=True, read_only=True)
    first_ticket = serializers.DictField(write_only=True, required=False)  # Cambiado a required=False

    class Meta:
        model = Story
        fields = ('id', 'project', 'title', 'description', 'tickets', 'first_ticket')
        read_only_fields = ('id',)

    def validate(self, data):
        # Eliminar la validación que obliga a first_ticket
        # o hacerla opcional
        request = self.context.get('request')
        if request and request.method == 'POST':
            first_ticket = self.initial_data.get('first_ticket', None)
            if first_ticket and not first_ticket.get('title'):
                raise serializers.ValidationError({
                    "first_ticket": "Si se proporciona first_ticket, debe incluir 'title'."
                })
        return data

    def create(self, validated_data):
        #  first_ticket si existe, sino continuar sin él
        first_ticket_data = validated_data.pop('first_ticket', None)
        
        # la historia
        story = Story.objects.create(**validated_data)
        
        # ticket inicial solo si se proporcionó
        if first_ticket_data:
            ticket_data = {
                'story': story,
                'title': first_ticket_data.get('title'),
                'description': first_ticket_data.get('description', ''),
                'comments': first_ticket_data.get('comments', ''),
                'status': first_ticket_data.get('status', 'ACTIVE')
            }
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