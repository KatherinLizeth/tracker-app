from django.urls import path
from .views import UserRegisterView
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, ProjectViewSet, StoryViewSet, TicketViewSet

router = DefaultRouter()
router.register(r'companies', CompanyViewSet, basename='company')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'stories', StoryViewSet, basename='story')
router.register(r'tickets', TicketViewSet, basename='ticket')

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
]

urlpatterns += router.urls