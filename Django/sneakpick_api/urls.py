from django.urls import path
from .views import BumpView, ProductList, ProductDetail

app_name = 'sneakpick_api'

urlpatterns = [
    path('<uuid:pk>', ProductDetail.as_view(), name='detailcreate'),
    path('', ProductList.as_view(), name='listcreate'),
    path('bump/<uuid:pk>', BumpView, name='bump_product'),
]
