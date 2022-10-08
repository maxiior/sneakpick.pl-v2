from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TalkViewSet, bump

app_name = 'talk'
router = DefaultRouter()
router.register(r'', TalkViewSet)

urlpatterns = [
    path('', include(router.urls), name='talk'),
    path('<uuid:pk>/bump/', bump, name='bump_question'),
]
