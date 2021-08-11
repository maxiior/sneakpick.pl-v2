from datetime import timedelta
from rest_framework import generics, viewsets
from rest_framework.response import Response
from sneakpick.models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.pagination import LimitOffsetPagination


class ProductUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the owner only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.owner == request.user


# class ProductList(generics.ListCreateAPIView):
#    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
#    pagination_class = LimitOffsetPagination
#    queryset = Product.productobjects.all()
#    serializer_class = ProductSerializer
#
#
# class ProductDetail(generics.RetrieveUpdateDestroyAPIView, ProductUserWritePermission):
#    permission_classes = [ProductUserWritePermission]
#    queryset = Product.objects.all()
#    serializer_class = ProductSerializer


# class ProductList(viewsets.ViewSet):
#    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
#    queryset = Product.productobjects.all()
#    pagination_class = LimitOffsetPagination
#
#    def list(self, request):
#        serializer_class = ProductSerializer(self.queryset, many=True)
#        return Response(serializer_class.data)
#
#    def retrieve(self, request, pk=None):
#        product = generics.get_object_or_404(self.queryset, pk=pk)
#        serializer_class = ProductSerializer(product)
#        return Response(serializer_class.data)

class ProductList(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    pagination_class = LimitOffsetPagination
    serializer_class = ProductSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return generics.get_object_or_404(Product, slug=item)

    def get_queryset(self):
        return Product.objects.all()
#
#
# class ProductDetail(viewsets.ModelViewSet, ProductUserWritePermission):
#    permission_classes = [ProductUserWritePermission]
#    queryset = Product.objects.all()
#    serializer_class = ProductSerializer
