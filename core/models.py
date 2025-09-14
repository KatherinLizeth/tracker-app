from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Company(models.Model):
    name = models.CharField(max_length=100)
    nit = models.CharField(max_length=20, unique=True)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return self.name
    

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='projects') #llave foranea

    def __str__(self):
        return f"{self.name} - ({self.company.name})"
    

class Story(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='stories') #llave foranea

    def __str__(self):
        return self.title


class Ticket(models.Model):
    STATUS_CHOICES = [
       ('ACTIVE', 'Activo'),
       ('IN_PROGRESS', 'En Progreso'),
       ('DONE', 'Finalizado'),
       ('CANCELLED', 'Cancelado'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    comments = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ACTIVE')
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='tickets') #llave foranea
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='tickets') #llave foranea

    def __str__(self):
        return f"{self.title} - ({self.status})"
