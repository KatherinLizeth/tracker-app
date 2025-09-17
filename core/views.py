from django.shortcuts import render
from .models import Company, Project, Story, Ticket, CustomUser
from .serializers import CompanySerializer, ProjectSerializer, StorySerializer, TicketSerializer, UserRegisterSerializer
from rest_framework import viewsets
from rest_framework import permissions, generics

# Create your views here.

class UserRegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegisterSerializer
    is_active = True
    permission_classes = [permissions.AllowAny]  # Permitir que cualquiera pueda registrarse


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

    def get_queryset(self):
        queryset = Story.objects.all()
        project_id = self.request.query_params.get('project', None)
        if project_id is not None:
            queryset = queryset.filter(project_id=project_id)
        return queryset


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [permissions.AllowAny]  # Permitir acceso sin autenticación -- permissions.IsAuthenticatedOrReadOnly


    def get_queryset(self):
        queryset = Ticket.objects.all().order_by('-created_at')
        project = self.request.query_params.get('project', None)
        story = self.request.query_params.get('story', None)

        if project:
            queryset = queryset.filter(story__project__id=project)

        if story:
            queryset = queryset.filter(story__id=story)

        return queryset
