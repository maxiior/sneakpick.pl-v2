from rest_framework import serializers
from sneakpick.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'condition',
                  'price', 'shoes_size', 'fit', 'kind',
                  'description', 'brand', 'category', 'colorway']
        read_only_fields = ['owner', 'created_at']

    def get_category_name(self, obj):
        return obj.category.name

    def get_brand_name(self, obj):
        return obj.brand.name

    def create(self, validated_data):
        owner = self.context['request'].user
        product_instance = Product.objects.create(
            **validated_data, owner=owner)

        return product_instance
