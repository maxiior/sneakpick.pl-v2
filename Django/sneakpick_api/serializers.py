from rest_framework import serializers
from sneakpick.models import Product, ProductImage
from django.utils.translation import ugettext as _
import os.path
import uuid

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

ALLOWED_IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "bmp", "gif"]
IMAGES_FOLDER_PATH = "static/product/images/"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['file_name', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    first_name = serializers.CharField(source='owner.first_name')
    last_name = serializers.CharField(source='owner.last_name')

    class Meta:
        model = Product
        fields = ['id', 'name', 'condition',
                  'price', 'size', 'fit', 'kind',
                  'description', 'brand', 'category',
                  'colorway', 'ship', 'meet', 'total_bumps', 'published', 'images', 'first_name', 'last_name', 'owner']
        read_only_fields = ['owner', 'created_at']

    def get_category_name(self, obj):
        return obj.category.name

    def get_brand_name(self, obj):
        return obj.brand.name

    def create(self, validated_data):
        owner = self.context['request'].user
        item = Product.object.create(
            **validated_data, owner=owner)

        for file in self.context['request'].FILES.getlist('images'):
            validate_extension(file.name)
            new_file_name = handle_uploaded_file(file)
            ProductImage.objects.create(
                file_name=new_file_name, product=item)

        return item

    def validate(self, attrs):
        if str(attrs['category']) in CATEGORIES_WITHOUT_FIT and 'fit' in attrs and attrs['fit'] is not None and attrs['fit'] != "":
            raise serializers.ValidationError({
                'category': _('This category can not has fit attribute.')
            })
        if str(attrs['category']) in CATEGORIES_WITH_FIT and ('fit' in attrs and attrs['fit'] is None or attrs['fit'] == ""):
            raise serializers.ValidationError({
                'category': _('This category must has fit attribute.')
            })
        if str(attrs['category']) == "Sneakersy" and 'size' in attrs and attrs['size'] not in SHOES_SIZES:
            raise serializers.ValidationError({
                'category': _('This category can not has this type of size.')
            })
        if str(attrs['category']) in CATEGORIES_WITH_FIT and 'size' in attrs and attrs['size'] not in CLOTHES_SIZES:
            raise serializers.ValidationError({
                'category': _('This category can not has this type of size.')
            })
        return attrs


def handle_uploaded_file(file):
    extension = os.path.splitext(file.name)[1]
    new_filename = f"{uuid.uuid4()}{extension}"

    destination = open(f'{IMAGES_FOLDER_PATH}{new_filename}', 'wb+')
    for chunk in file.chunks():
        destination.write(chunk)
    destination.close()

    return new_filename


def validate_extension(filename):
    extension = os.path.splitext(filename)[1].replace(".", "")
    if extension.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        raise serializers.ValidationError(
            (f'Invalid uploaded file type: {filename}'),
            code='invalid',
        )


def delete_image(filename):
    path = IMAGES_FOLDER_PATH + filename
    os.remove(path)
