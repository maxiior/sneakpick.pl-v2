from .models import Order
from rest_framework import serializers
from products.serializers import ProductSerializer, ProductDeliverySerializer
from users.serializers import AddressSerializer, CustomUserSerializer


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id','order_id', 'product', 'delivery','address', 'status', 'buyer', 'order_time']
        read_only_fields = ['buyer', 'order_time']


    def create(self, validated_data):
        print(validated_data)
        print(self.context)
        buyer = self.context['request'].user
        order = Order.objects.create(
            **validated_data, buyer=buyer, order_id = self.context['order_id'])

        return order




class OrderWithProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    delivery = ProductDeliverySerializer()
    address = AddressSerializer()
    buyer = serializers.SerializerMethodField('get_custom_user_serializer')
    class Meta:
        model = Order
        fields = ['id','order_id', 'product', 'delivery','address', 'status', 'buyer', 'order_time']
        read_only_fields = ['buyer', 'order_time']

    def get_custom_user_serializer(self, obj):
        serializer_context = {'request': self.context.get('request') }
        serializer = CustomUserSerializer(obj.buyer, context=serializer_context)
        return serializer.data
