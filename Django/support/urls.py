from django.urls import path, include
from rest_framework.routers import DefaultRouter
from support import views

app_name = 'support'


urlpatterns = [
    path('ticket/', views.TicketView.as_view(), name = 'Create ticket'),
]
