from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .pagination import Pagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import parsers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, throttle_classes, permission_classes
from core.throttle import OnceADayPerURLThrottle
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import get_object_or_404
import json
from django.shortcuts import redirect
from django_filters.filters import OrderingFilter
import django_filters



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bump(request, pk):
    if request.user.is_authenticated:
        if Product.objects.filter(id=pk, bumps=request.user.id).exists():
            return Response({'Error': 'Already bumped'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            product = get_object_or_404(Product, id=pk)
            product.bumps.add(request.user)
            return Response({"total_bumps": product.bumps.count()}, status=status.HTTP_200_OK)
            
class MultipartJsonParser(parsers.MultiPartParser):

    def parse(self, stream, media_type=None, parser_context=None):
        result = super().parse(
            stream,
            media_type=media_type,
            parser_context=parser_context
        )
        data = {}

        for key, value in result.data.items():
            if type(value) != str:
                data[key] = value
                continue
            if ('{' in value and '}' in value) or ("[" in value and "]" in value):
                try:
                    data[key] = json.loads(value)
                except ValueError:
                    data[key] = value
            else:
                data[key] = value
        return parsers.DataAndFiles(data, result.files)


class ProductFilter(django_filters.FilterSet):
    order_by_field = 'ordering'
    ordering = OrderingFilter(
        fields=(
            ('-bumps', '1'),
            ('price', '2'),
            ('-price', '3'),
            ('id', '4'),
            ('-published', '5'),
        )
    )

    class Meta:
        model = Product
        fields = ['category', 'brand',
                  'kind', 'condition', 'fit', 'colorway', 'price', 'owner']


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(bought=False).all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = Pagination
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    parser_classes = [MultipartJsonParser, parsers.JSONParser]
    search_fields = ['name']
    filter_fields = {
        'kind': ["in", "exact"],
        'name': ["exact"],
        'category': ["in", "exact"],
        'owner': ["exact"],
        'price': ["exact"],
        'brand': ["in", "exact"],
        'fit': ["in", "exact"],
        'colorway': ["in", "exact"],
        'size': ["in", "exact"],
        'condition': ["in", "exact"],
        'name': ["exact"]
    }
    filter_class = ProductFilter


@api_view(['POST'])
@throttle_classes([OnceADayPerURLThrottle])
@permission_classes([IsAuthenticated])
def post_incremenent_product_views(request, pk, format=None):
    product = Product.objects.get(pk=pk)
    # user cannot increment views in own products
    if product.owner.id == request.user.id:
        return Response(data="Cannot increment view in own product", status=status.HTTP_403_FORBIDDEN)

    product.views += 1
    product.save()

    return Response(status=status.HTTP_200_OK)
