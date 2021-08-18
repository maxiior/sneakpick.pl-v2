from django.db.models import fields
from rest_framework import serializers
from sneakpick.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'condition', 'slug',
                  'price', 'shoes_size', 'fit', 'kind',
                  'description', 'brand_name', 'category_name')

    category_name = serializers.SerializerMethodField('get_category_name')
    brand_name = serializers.SerializerMethodField('get_brand_name')

    def get_category_name(self, obj):
        return obj.category.name

    def get_brand_name(self, obj):
        return obj.brand.name
