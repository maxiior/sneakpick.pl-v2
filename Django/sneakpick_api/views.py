from datetime import timedelta
from rest_framework import generics, viewsets
from sneakpick.models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.pagination import LimitOffsetPagination


class ProductUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the owner only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.owner == request.user


class ProductList(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    pagination_class = LimitOffsetPagination
    serializer_class = ProductSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return generics.get_object_or_404(Product, slug=item)

    def get_queryset(self):
        return Product.objects.all()
