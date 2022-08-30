from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import Product, ProductImage, Delivery
from users.serializers import CustomUserSerializer
import uuid
import os.path


CATEGORY = ["sneakersy", "hoodie", "teesy", "koszule", "crewnecki", "longsleevy", "katany", "kurtki", "płaszcze",
            "spodnie", "szale", "portfele", "plecaki", "zegarki", "czapki", "belty", "bielizna", "inne"]

CATEGORIES_WITHOUT_FIT = ["sneakersy", "szale", "portfele", "plecaki", "zegarki", "czapki", "belty"]
CATEGORIES_WITH_FIT = ["hoodie", "teesy", "koszule", "crewnecki", "longsleevy", "katany", "kurtki", "płaszcze", "spodnie", "bielizna"]
CLOTHES_SIZES = ["xxs", "xs", "s", "m", "l", "xl", "xxl"]
SHOES_SIZES = ['36.0', '36.5', '37.0', '37.5', '38.0', '38.5',
               '39.0', '39.5', '40.0', '40.5', '41.0', '41.5',
               '42.0', '42.5', '43.0', '43.5', '44.0', '44.5',
               '45.0', '45.5', '46.0', '46.5', '47.0', '47.5',
               '48.0', '48.5', '49.0', '49.5', '50.0']

ALLOWED_IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "bmp", "gif"]
IMAGES_FOLDER_PATH = "static/product/images/"

class ProductIdSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(write_only=True)
    class Meta:
        model = Product
        fields = ('id',)
        
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['file_name', 'created_at']


class ProductDeliverySerializer(serializers.ModelSerializer):
    class Meta: 
        model = Delivery
        fields = ["id", "price", "delivery_time", "method", "city"] 

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    is_bumped = serializers.SerializerMethodField()

    first_name = serializers.CharField(
        source='owner.first_name', required=False)
    last_name = serializers.CharField(
        source='owner.last_name', required=False)

    class Meta:
        model = Product
        fields = ['id', 'name', 'condition',
                  'price', 'size', 'fit', 'kind',
                  'description', 'brand', 'category',
                  'colorway', 'total_bumps', 'published', 'images', 
                  'is_bumped', 'first_name', 'last_name', 'owner', 'views', 'bought']
        read_only_fields = ['owner', 'created_at', 'views']

    # def get_category_name(self, obj):
    #     return obj.category.name

    # def get_brand_name(self, obj):
    #     return obj.brand.name



    def create(self, validated_data):
        if 'owner' in validated_data:
            validated_data.pop('owner')
            
        owner = self.context['request'].user
        item = Product.object.create(
            **validated_data, owner=owner)

        for file in self.context['request'].FILES.getlist('images'):
            validate_extension(file.name)
            new_file_name = handle_uploaded_file(file)
            ProductImage.objects.create(
                file_name=new_file_name, product=item)

        return item
    
    def update(self, instance, validated_data):        
        for field in validated_data:
            instance.__setattr__(field, validated_data[field])
            
        return instance
        

    def validate(self, attrs):
        if str(attrs['category']) in CATEGORIES_WITHOUT_FIT and 'fit' in attrs and attrs['fit'] is not None and attrs['fit'] != "":
            raise serializers.ValidationError({
                'category': _('This category can not has fit attribute.')
            })
        if str(attrs['category']) in CATEGORIES_WITH_FIT and ('fit' in attrs and attrs['fit'] is None or attrs['fit'] == ""):
            raise serializers.ValidationError({
                'category': _('This category must has fit attribute.')
            })
        if str(attrs['category']) == "Buty" and 'size' in attrs and attrs['size'] not in SHOES_SIZES:
            raise serializers.ValidationError({
                'category': _('This category can not has this type of size.')
            })
        if str(attrs['category']) in CATEGORIES_WITH_FIT and 'size' in attrs and attrs['size'] not in CLOTHES_SIZES:
            raise serializers.ValidationError({
                'category': _('This category can not has this type of size.')
            })
        return attrs
    
    def get_is_bumped(self, obj):
        request = self.context.get('request')
        if request.user.is_authenticated:
            return Product.objects.filter(id=obj.id, bumps=request.user.id).exists()


def handle_uploaded_file(file):
    extension = os.path.splitext(file.name)[1]
    new_filename = f"{uuid.uuid4()}{extension}"

    destination = open(f'static/product/images/{new_filename}', 'wb+')
    for chunk in file.chunks():
        destination.write(chunk)

    destination.close()
    print(new_filename)
    return new_filename


def delete_file(filename):
    path = 'static/product/images/' + filename
    os.remove(path)


def validate_extension(filename):
    extension = os.path.splitext(filename)[1].replace(".", "")
    if extension.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        raise serializers.ValidationError(
            (f'Invalid uploaded file type: {filename}'),
            code='invalid',
        )

