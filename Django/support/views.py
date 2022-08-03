from re import I
from urllib.request import Request
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from support.serializers import TicketSerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import status, viewsets, generics
from rest_framework.views import APIView


class TicketView(APIView):
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(request_body=TicketSerializer, responses={201: 'Created'})
    def post(self, request, format=None):
        ticker_serializer = TicketSerializer(data=request.data)
        if ticker_serializer.is_valid():   
            ticker_serializer.save(user=request.user)
            return Response(status=status.HTTP_201_CREATED, data=ticker_serializer.data)
        else:
            return Response(ticker_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    