from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('sneakpick.urls', namespace='sneakpick')),
    path('api/', include('sneakpick_api.urls', namespace='sneakpick_api')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
