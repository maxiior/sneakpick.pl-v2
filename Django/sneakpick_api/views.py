from django.shortcuts import get_object_or_404
from rest_framework import generics
from sneakpick.models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.decorators import api_view, permission_classes
from django.http import HttpResponseRedirect
from django.urls import reverse
from django_filters.filters import OrderingFilter
import django_filters


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def BumpView(request, pk):
    product = get_object_or_404(Product, id=pk)
    product.bumps.add(request.user)
    return HttpResponseRedirect(reverse('sneakpick_api:detailcreate', args=[pk]))


class ProductUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the owner only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.owner == request.user


# class ProductList(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     pagination_class = LimitOffsetPagination

#     filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
#     search_fields = ['^slug']
#     filterset_fields = ['category', 'brand',
#                         'kind', 'condition', 'fit', 'colorway']

#     def get_object(self, queryset=None, **kwargs):
#         item = self.kwargs.get('pk')
#         return generics.get_object_or_404(Product, id=item)

#     def get_queryset(self):
#         return Product.objects.all()

class ProductFilter(django_filters.FilterSet):
    order_by_field = 'ordering'
    ordering = OrderingFilter(
        fields=(
            ('bumps', '1'),
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


class ProductList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Product.productobjects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
    search_fields = ['^slug']
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_class = ProductFilter


class ProductDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Product.object.all()
    serializer_class = ProductSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return generics.get_object_or_404(Product, id=item)


class UserProductList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Product.productobjects.all()
    serializer_class = ProductSerializer

    def get_queryset(self, queryset=None, **kwargs):
        user = self.kwargs.get('pk')
        print(user)
        return Product.object.filter(owner=user)
