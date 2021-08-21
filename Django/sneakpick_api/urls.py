# from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from .views import ProductList, ProductDetail, ProductListDetailFilter
from django.urls import path

app_name = 'sneakpick_api'

router = DefaultRouter()
router.register('', ProductList, basename='product')
urlpatterns = router.urls

# urlpatterns = [
#     path('?limit=<int:limit>&offset=<int:offset>/',
#          ProductList.as_view(), name='listcreate'),
#     path('', ProductList.as_view(), name='listcreate'),
#     path('products/<slug:pk>/', ProductDetail.as_view(), name='detailcreate'),
#     path('search/', ProductListDetailFilter.as_view(), name='postsearch'),
# ]
