from rest_framework import generics
from sneakpick.models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.pagination import LimitOffsetPagination


class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the owner only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.owner == request.user


class ProductList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    pagination_class = LimitOffsetPagination
    queryset = Product.productobjects.all()
    serializer_class = ProductSerializer


class ProductDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
