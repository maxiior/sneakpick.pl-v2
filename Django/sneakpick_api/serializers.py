from rest_framework import serializers
from sneakpick.models import Product
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as _

CATEGORIES_WITHOUT_FIT = ["Sneakersy", "Szale",
                          "Portfele", "Plecaki", "Zegarki", "Czapki", "Belty"]
CATEGORIES_WITH_FIT = ["Hoodie", "Teesy", "Koszule", "Crewnecki",
                       "Longsleevy", "Katany", "Kurtki", "Płaszcze", "Spodnie", "Bielizna"]
CLOTHES_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
SHOES_SIZES = ['36.0', '36.5', '37.0', '37.5', '38.0', '38.5',
               '39.0', '39.5', '40.0', '40.5', '41.0', '41.5',
               '42.0', '42.5', '43.0', '43.5', '44.0', '44.5',
               '45.0', '45.5', '46.0', '46.5', '47.0', '47.5',
               '48.0', '48.5', '49.0', '49.5', '50.0']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'condition',
                  'price', 'size', 'fit', 'kind',
                  'description', 'brand', 'category',
                  'colorway', 'ship', 'meet', 'total_bumps', 'published']
        read_only_fields = ['owner', 'created_at']

    def get_category_name(self, obj):
        return obj.category.name

    def get_brand_name(self, obj):
        return obj.brand.name

    def create(self, validated_data):
        owner = self.context['request'].user

        product_instance = Product.object.create(
            **validated_data, owner=owner)

        return product_instance

    def validate(self, attrs):
        if str(attrs['category']) in CATEGORIES_WITHOUT_FIT and attrs['fit'] is not None and attrs['fit'] != "":
            raise serializers.ValidationError({
                'category': _('This category can not has fit attribute.')
            })
        if str(attrs['category']) in CATEGORIES_WITH_FIT and (attrs['fit'] is None or attrs['fit'] == ""):
            raise serializers.ValidationError({
                'category': _('This category must has fit attribute.')
            })
        if str(attrs['category']) == "Sneakersy" and attrs['size'] not in SHOES_SIZES:
            raise serializers.ValidationError({
                'category': _('This category can not has this type of size.')
            })
        if str(attrs['category']) in CATEGORIES_WITH_FIT and attrs['size'] not in CLOTHES_SIZES:
            raise serializers.ValidationError({
                'category': _('This category can not has this type of size.')
            })
        return attrs
