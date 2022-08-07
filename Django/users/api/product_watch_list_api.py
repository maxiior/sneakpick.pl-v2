from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from users.models import Watchlist
from drf_yasg.utils import swagger_auto_schema
from core.APIViewExtension import GenericAPIViewFilter
from products.models import Product
from products.serializers import ProductSerializer, ProductIdSerializer
from products.pagination import Pagination


class ProductWatchlistAPI(APIView, Pagination):
    permission_classes = [IsAuthenticated]
    filter_fields = ('id', 'name', 'description', 'price', 'brand')

    @swagger_auto_schema(responses={200: ProductSerializer(many=True)}, paginator=Pagination())
    def get(self, request, pk, format=None):
        """
        Get all products that the user is following.
        Filterings available: id, name, description, price, brand
        Could be used to determine if a user is following a product.
        """

        if request.user.id != pk:
            return Response({'Error': 'Cannot perform operation on another user'}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        watchlist = Watchlist.objects.filter(user=user, product__bought=False)
        products_qs = Product.objects.filter(
            id__in=watchlist.values_list('product', flat=True))
        filtered_qs = GenericAPIViewFilter().filter_queryset(request, products_qs, self)
        paginated_qs = self.paginate_queryset(filtered_qs, request, view=self)
        product_serializer = ProductSerializer(paginated_qs, many=True)
        product_serializer.context.update({"request": request})
        return self.get_paginated_response(product_serializer.data)

    @swagger_auto_schema(request_body=ProductIdSerializer, responses={201: ''})
    def post(self, request, pk, format=None):
        """
        Add a product to the watchlist.
        """
        user = request.user

        if request.user.id != pk:
            return Response({'Error': 'Cannot perform operation on another user'}, status=status.HTTP_400_BAD_REQUEST)

        product_id_from_request_body = request.data.get('id')
        # if product exists, add it to watchlist
        if Product.objects.filter(id=product_id_from_request_body, bought=False).exists():
            product = Product.objects.get(id=product_id_from_request_body)
            if product.owner.id == user.id:
                return Response({'Error': 'Cannot follow own product'}, status=status.HTTP_400_BAD_REQUEST)
            existing_watchlist = Watchlist.objects.filter(
                user=user, product=product).first()
            if not existing_watchlist:
                watchlist = Watchlist.objects.create(
                    user=user, product=product)
                watchlist.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response({'Error': 'Already in watchlist'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'Error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(responses={200: ''})
    def delete(self, request, pk, product_id, format=None):
        """
        Remove a product from the watchlist.
        """
        user = request.user

        if request.user.id != pk:
            return Response({'Error': 'Cannot perform operation on another user'}, status=status.HTTP_400_BAD_REQUEST)

        # if product exists, remove it from watchlist
        if Product.objects.filter(id=product_id).exists():
            product = Product.objects.get(id=product_id)
            existing_watchlist = Watchlist.objects.filter(
                user=user, product=product).first()
            if existing_watchlist:
                existing_watchlist.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'Error': 'Not in watchlist'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'Error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
