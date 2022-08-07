from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BoughtItemView, OrderView, AddOrderView, PaidOrderView, approve_order, SoldItemView

app_name = 'checkout'


urlpatterns = [
    path('order/<str:order_id>',OrderView.as_view(), name = 'PayPal Payment' ),
    path('order/',AddOrderView.as_view(), name = 'PayPal Payment Addition' ),
    path('order/approve/<str:order_id>', approve_order , name = "Payment Approvement"),
    path('orders/', PaidOrderView.as_view() , name = "Payments captured"),
    path('bought/', BoughtItemView.as_view() , name = "User Orders"),
    path('sold/', SoldItemView.as_view() , name = "User Sold items"),
]
