# core/urls.py
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, ProjectViewSet, StoryViewSet, TicketViewSet

# C router
router = DefaultRouter()
router.register(r'companies', CompanyViewSet, basename='company')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'stories', StoryViewSet, basename='story')
router.register(r'tickets', TicketViewSet, basename='ticket')

urlpatterns = router.urls
