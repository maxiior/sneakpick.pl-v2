from django.urls import path
from .views import ProductList, ProductDetail


app_name = 'sneakpick_api'

urlpatterns = [
    path('<int:pk>/', ProductDetail.as_view(), name='detailcreate'),
    path('', ProductList.as_view(), name='listcreate'),
]