from django.db.models import fields
from rest_framework import serializers
from sneakpick.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'title', 'author', 'excerpt', 'content', 'status')
