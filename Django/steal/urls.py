from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StealViewSet

app_name = 'steal'
router = DefaultRouter()
router.register(r'', StealViewSet)

urlpatterns = [
    path('', include(router.urls), name='steal')
]
