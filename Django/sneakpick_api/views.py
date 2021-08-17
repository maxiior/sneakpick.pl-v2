from datetime import timedelta
from rest_framework import generics, viewsets
from sneakpick.models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import filters


class ProductUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the owner only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.owner == request.user


class ProductList(generics.ListAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination

    # def get_queryset(self):
    #     user = self.request.user
    #     return Product.objects.filter(owner=user)


class ProductDetail(generics.RetrieveAPIView, ProductUserWritePermission):
    permission_classes = [ProductUserWritePermission]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return generics.get_object_or_404(Product, slug=item)

    # def get_queryset(self):
    #     slug = self.kwargs('pk')
    #     return Product.objects.filter(slug=slug)

    # def get_queryset(self):
    #     slug = self.request.query_params.get('slug', None)
    #     return Product.objects.filter(slug=slug)


class ProductListDetailFilter(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']
