from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, post_incremenent_product_views, bump

app_name = 'products'
router = DefaultRouter()
router.register(r'', ProductViewSet)

urlpatterns = [
    path('', include(router.urls), name='product'),
    path('<uuid:pk>/views/', post_incremenent_product_views, name='product_views'),
    path('<uuid:pk>/bump/', bump, name='bump_product'),
]
