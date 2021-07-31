from django.urls import path
from django.views.generic import TemplateView

app_name = 'sneakpick'

urlpatterns = [
    path('', TemplateView.as_view(template_name="sneakpick/index.html")),
]
