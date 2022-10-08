from rest_framework import serializers
from .models import Question, Image
import uuid
import os.path

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['file_name', 'published']

class QuestionSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    is_bumped = serializers.SerializerMethodField()

    first_name = serializers.CharField(
        source='owner.first_name', required=False)
    last_name = serializers.CharField(
        source='owner.last_name', required=False)
    profile_photo = serializers.CharField(
        source='owner.profile_photo', required=False)

    class Meta:
        model = Question
        fields = ['id', 'title', 'description', 'category', 'total_bumps', 'published', 'images', 
                  'is_bumped', 'first_name', 'last_name', 'profile_photo', 'owner', 'views', 'item']
        read_only_fields = ['owner', 'published', 'views']

    def create(self, validated_data):
        if 'owner' in validated_data:
            validated_data.pop('owner')

        if validated_data['category'] == "id" and validated_data['item'] != "":
            raise serializers.ValidationError({
                'item': ('This category can not has item.')
            })
        elif validated_data['category'] != "id" and validated_data['item'] == "":
            raise serializers.ValidationError({
                'item': ('This category must has item.')
            })
            
        owner = self.context['request'].user
        item = Question.objects.create(
            **validated_data, owner=owner)

        for file in self.context['request'].FILES.getlist('images'):
            validate_extension(file.name)
            new_file_name = handle_uploaded_file(file)
            Image.objects.create(
                file_name=new_file_name, question=item)

        return item
    
    def update(self, instance, validated_data):        
        for field in validated_data:
            instance.__setattr__(field, validated_data[field])
            
        return instance
    
    def get_is_bumped(self, obj):
        request = self.context.get('request')
        if request.user.is_authenticated:
            return Question.objects.filter(id=obj.id, bumps=request.user.id).exists()

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

    destination = open(f'static/talk/images/{new_filename}', 'wb+')
    for chunk in file.chunks():
        destination.write(chunk)

    destination.close()
    return new_filename