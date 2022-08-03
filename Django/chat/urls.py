from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConversationViewSet  # , ProductCreate

app_name = 'chat'
router = DefaultRouter()
router.register(r'', ConversationViewSet, basename='conversation')

urlpatterns = [
    path('', include(router.urls)),
]
