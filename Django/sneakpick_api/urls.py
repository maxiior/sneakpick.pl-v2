from django.urls import path
from .views import BumpView, ProductList, ProductDetail, UserProductList

app_name = 'sneakpick_api'

urlpatterns = [
    path('user_list/<uuid:pk>',
         UserProductList.as_view(), name='user_product_list'),
    path('<uuid:pk>', ProductDetail.as_view(), name='detailcreate'),
    path('', ProductList.as_view(), name='listcreate'),
    path('bump/<uuid:pk>', BumpView, name='bump_product'),
]
