from rest_framework import serializers
from .models import Steal, Store
import os
import uuid

class StealStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['store_name', 'photo']

class StealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Steal
        fields = ['link', 'published', 'category', 'header', 'photo', 'markdown', 'description', 'rocket', 'alert']
        read_only_fields = ['owner', 'published']
    
    def create(self, validated_data):       
        images = self.context['request'].FILES.getlist('images')
        owner = self.context['request'].user

        if len(images) != 1:
            raise serializers.ValidationError(('Wrong number of images.'), code='invalid')
        image = images[0]
        validate_extension(image.name)
        new_file_name = handle_uploaded_file(image)

        Store.objects.create(photo=new_file_name)
        steal = Steal.objects.create(**validated_data, owner=owner, photo=new_file_name)
        return steal


ALLOWED_IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "bmp", "gif"]

def validate_extension(filename):
    extension = os.path.splitext(filename)[1].replace(".", "")
    if extension.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        raise serializers.ValidationError(
            (f'Invalid uploaded file type: {filename}'),
            code='invalid',
        )
    
def handle_uploaded_file(file):
    extension = os.path.splitext(file.name)[1]
    new_filename = f"{uuid.uuid4()}{extension}"

    destination = open(f'static/store/images/{new_filename}', 'wb+')
    for chunk in file.chunks():
        destination.write(chunk)
    destination.close()
    return new_filename