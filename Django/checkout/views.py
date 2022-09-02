from django.shortcuts import render, redirect


from checkout.serializers import OrderSerializer, OrderWithProductSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from paypalcheckoutsdk.orders import OrdersGetRequest, OrdersCreateRequest, OrdersCaptureRequest
from rest_framework import status, viewsets, generics
from checkout.models import Order, PayPalClient
from products.models import Product, Delivery
from users.models import Address, User
import base64, requests, json 
import time
from core.pagination import Pagination
from drf_yasg.utils import swagger_auto_schema


class OrderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def get(self, queryset=None, **kwargs):
        Client = PayPalClient()
        order_id = self.kwargs.get('order_id')
        request = OrdersGetRequest(order_id)
        response = Client.client.execute(request)
        print(response.result)
        print ('Status Code: ', response.status_code)
        print ('Status: ', response.result.status)
        print ('Order ID: ', response.result.id)
        print ('Intent: ', response.result.intent)
        print ('Links:')
        for link in response.result.links:
            print('\t{}: {}\tCall Type: {}'.format(link.rel, link.href, link.method))
        
        print ('Gross Amount: {} {}'.format(response.result.purchase_units[0].amount.currency_code,
                            response.result.purchase_units[0].amount.value))

        order = Order.objects.get(order_id= order_id)
        serializer = OrderSerializer(order,  context={'request': request,})
        return Response(serializer.data, status=status.HTTP_200_OK)
        

class AddOrderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    
    def post(self, request, debug = True):
        product = Product.objects.get(id = request.data["product"])
        if product.bought == True:
            return Response({"error" : "This product has already been bought"}, status = status.HTTP_409_CONFLICT)
        Client = PayPalClient()
        pprequest = OrdersCreateRequest()
        pprequest.prefer('return=representation')
        pprequest.request_body(build_request_body(request.data, request.user.id))
        response = Client.client.execute(pprequest)  
        serializer = OrderSerializer(data=request.data,  context={'request': request, 'order_id' : response.result.id })
        if debug:
            print ('Status Code: ', response.status_code)
            print ('Status: ', response.result.status)
            print ('Order ID: ', response.result.id)
            print ('Intent: ', response.result.intent)
            print ('Links:')
            for link in response.result.links:
                print('\t{}: {}\tCall Type: {}'.format(link.rel, link.href, link.method))
        
            print ('Total Amount: {} {}'.format(response.result.purchase_units[0].amount.currency_code,
                            response.result.purchase_units[0].amount.value))
        if serializer.is_valid():
            order = serializer.save()
            if order: 
                order = serializer.data
                return Response(order, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PaidOrderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    
    def get(self, queryset=None, **kwargs):
        vendor_id =  self.request.user.id
        products = Product.objects.exclude(owner=vendor_id)
        captured = Order.objects.filter(status = True).exclude(product__in = products)
        serializer = OrderSerializer(
            captured, many=True, context={'request': self.request,})
        return Response(serializer.data,  status=status.HTTP_200_OK)
    


class BoughtItemView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderWithProductSerializer

    @swagger_auto_schema(responses={200: OrderWithProductSerializer(many=True)})
    def get(self, request, queryset=None, **kwargs):
        user_id =  self.request.user.id
        orders = Order.objects.filter(status = True, buyer = user_id, product__bought = True).order_by('-order_time')
        orders_serializer = OrderWithProductSerializer(orders, many=True, context={'request': request,})
        return Response(orders_serializer.data,  status=status.HTTP_200_OK)
    
class SoldItemView(APIView, Pagination):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderWithProductSerializer

    @swagger_auto_schema(responses={200: OrderWithProductSerializer(many=True)}, paginator=Pagination())
    def get(self, request, queryset=None, **kwargs):
        user_id =  self.request.user.id
        orders = Order.objects.filter(status = True, product__owner = user_id, product__bought = True).order_by('-order_time')
        paginated_orders = self.paginate_queryset(orders, request, view=self)
        orders_serializer = OrderWithProductSerializer(paginated_orders, many=True, context={'request': request,})
        return self.get_paginated_response(orders_serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def approve_order(request, order_id : str):
        timeout = time.time() + 60*5
        Client = PayPalClient()
        request = OrdersGetRequest(order_id)
        while True:
            response = Client.client.execute(request)
            state = response.result.status
            if state == "APPROVED":
                pprequest = OrdersCaptureRequest(order_id)
                Client.client.execute(pprequest)  
                order = Order.objects.get(order_id = order_id)
                product = Product.objects.get(id =order.product.id)
                order.status = True
                order.save()
                product.bought = True
                product.save()
                captured = {"order_id" : order_id, "state" : "captured"}
                return Response(captured, status = status.HTTP_202_ACCEPTED)
                
            elif time.time() > timeout:
                break
            else:
                time.sleep(10)
        return Response({"order_id" : order_id, "state" : "error"}, status=status.HTTP_408_REQUEST_TIMEOUT)
       

def get_shipping_price(id):
    delivery = generics.get_object_or_404(Delivery, id=id)
    return delivery.price



def build_request_body(data, user_id):
        product = generics.get_object_or_404(Product, id=data['product'])
        shipping_price = get_shipping_price(data['delivery'])

        return \
        {
            "intent": "CAPTURE",
            "application_context": {
            "brand_name": "WearPoint",
            "landing_page": "BILLING",
            "user_action": "CONTINUE"
            },
            "purchase_units": [
            {
                "amount": {
                "currency_code": "PLN",
                "value": str(product.price + shipping_price),
                "breakdown": {
                    "item_total": {
                    "currency_code": "PLN",
                    "value": str(product.price)
                    },
                    "shipping": {
                    "currency_code": "PLN",
                    "value": str(shipping_price)
                    }
                }
                },
                "item": [
                {
                    "name": product.name,
                    "description": product.description,
                    "unit_amount": {
                    "currency_code": "PLN",
                    "value": str(product.price)
                    },
                    "quantity": "1",
                    "category": product.category
                }
                ],
            "description": product.name,
             }
            ]
        }
