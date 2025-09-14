from django.shortcuts import render
from .models import Company, Project, Story, Ticket
from .serializers import CompanySerializer, ProjectSerializer, StorySerializer, TicketSerializer
from rest_framework import viewsets
from rest_framework import permissions

# Create your views here.

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Permitir acceso sin autenticación


    def get_queryset(self):
        queryset = Ticket.objects.all().order_by('-created_at')
        project = self.request.query_params.get('project', None)
        story = self.request.query_params.get('story', None)

        if project:
            queryset = queryset.filter(story__project__id=project)

        if story:
            queryset = queryset.filter(story__id=story)

        return queryset
