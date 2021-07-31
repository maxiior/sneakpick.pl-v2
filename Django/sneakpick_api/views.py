from rest_framework import generics
from sneakpick.models import Product
from .serializers import ProductSerializer


class ProductList(generics.ListCreateAPIView):
    queryset = Product.productobjects.all()
    serializer_class = ProductSerializer


class ProductDetail(generics.RetrieveDestroyAPIView):
    queryset = Product.object.all()
    serializer_class = ProductSerializer
