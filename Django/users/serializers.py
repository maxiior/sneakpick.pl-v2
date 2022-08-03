import os
import uuid
from users.models import Address, Follower, ProfileComment
from rest_framework import serializers
from users.models import User
import json
from .validators import MinimumLengthValidator, NumberValidator, UppercaseValidator, LowercaseValidator, SpecialCharactersValidator
from django.db.models import Avg


ALLOWED_IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "bmp", 
                            #"gif" gify nie dla biedaków
                            ]
IMAGES_FOLDER_PATH = "static/user/images/"

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, write_only=True)
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    is_followed = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'city',
                  'description', 'following_count', 'followers_count',
                  'average_rating', 'is_followed', 'profile_photo')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, password):
        MinimumLengthValidator().validate(password)
        NumberValidator().validate(password)
        UppercaseValidator().validate(password)
        LowercaseValidator().validate(password)
        SpecialCharactersValidator().validate(password)
        return password

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def get_followers_count(self, obj):
        return obj.following.count()

    def get_following_count(self, obj):
        return obj.follower.count()
    
    def get_average_rating(self, obj):
        user_comments = ProfileComment.objects.filter(related_user=obj)
        #filter 0 values
        user_wihout_zero_ratings = user_comments.filter(rating__gt=0)
        average_rating = user_wihout_zero_ratings.aggregate(Avg('rating'))['rating__avg']
        if average_rating is None:
            return 0
        return round(average_rating, 2)
    
    def get_is_followed(self, obj):
        request = self.context.get('request')
        if request.user.is_authenticated:
            follower_obj = Follower.objects.filter(follower=request.user.id, following=obj.id)
            if follower_obj.exists():
                return True
        return False


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('user', 'id', 'zipcode', 'country',
                  'region', 'city', 'address', 'phone')
        read_only_fields = ['user', 'created_at']

    def create(self, validated_data):
        print(validated_data)
        print(self.context)
        user = self.context['request'].user
        address = Address.objects.create(
            **validated_data, user=user)

        return address


class AddressUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('zipcode', 'country', 'region', 'city', 'address', 'phone')

        def put(self, instance, validated_data):
            if instance.user == self.context['request'].user:
                instance.zipcode = validated_data.get(
                    'zipcode',  instance.zipcode)
                instance.country = validated_data.get(
                    'country',  instance.country)
                instance.region = validated_data.get(
                    'region',  instance.region)
                instance.city = validated_data.get('city',  instance.city)
                instance.address = validated_data.get('address',  instance.address)
                instance.phone = validated_data.get('phone',  instance.phone)

                instance.save()
            return instance


class UserUpdateSerializer(serializers.ModelSerializer):
    profile_image = serializers.FileField(required=False, write_only=True)
    profile_photo = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'city', 'description', 'profile_photo', 'profile_image')

    def __init__(self, *args, **kwargs):
        super(UserUpdateSerializer, self).__init__(*args, **kwargs)
        self.fields['email'].required = False
        self.fields['description'].required = False

    def update(self, instance, validated_data):
        if instance.id == self.context['request'].user.id:
            instance.email = validated_data.get('email', instance.email)
            instance.first_name = validated_data.get('first_name', instance.first_name)
            instance.last_name = validated_data.get('last_name', instance.last_name)
            instance.city = validated_data.get('city', instance.city)
            instance.description = validated_data.get('description', instance.description)
            uploaded_file = validated_data.get('profile_image', None)
            if uploaded_file:
                validate_extension(uploaded_file.name)
                instance.profile_photo = handle_uploaded_file(uploaded_file)
            instance.save()
        return instance


class PswdUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        required=True, min_length=8, write_only=True)
    new_password = serializers.CharField(
        required=True, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('password', 'new_password')

    def validate_password(self, password):
        user = self.context['request'].user
        if user.check_password(password):
            return password
        raise serializers.ValidationError({"password": "Password incorrect."})

    def update(self, instance, validated_data):
        new_password = validated_data['new_password']
        if new_password == validated_data['password']:
            raise serializers.ValidationError(
                {"new_password": "The new password must be different from the old one."})

        try:
            MinimumLengthValidator().validate(new_password)
            NumberValidator().validate(new_password)
            UppercaseValidator().validate(new_password)
            LowercaseValidator().validate(new_password)
            SpecialCharactersValidator().validate(new_password)
        except:
            raise serializers.ValidationError(
                {"new_password": "The new password must be different from the old one."})

        instance.set_password(new_password)
        instance.save()
        return instance


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
      

class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']


class ProfileCommentSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField('get_custom_user_serializer')
    responses = serializers.SerializerMethodField('get_custom_response_serializer')
    class Meta:
        model = ProfileComment
        fields = ['id', 'comment', 'rating', 'author', 'created_at', 'parent', 'responses']
        read_only_fields = ['author', 'created_at', 'id']
        
    def get_custom_user_serializer(self, obj):
        serializer_context = {'request': self.context.get('request') }
        serializer = CustomUserSerializer(obj.author, context=serializer_context)
        return serializer.data
    
    def get_custom_response_serializer(self, obj):
        serializer_context = {'request': self.context.get('request') }
        responses = ProfileComment.objects.filter(parent=obj.id)
        serializer = ProfileCommentSerializer(responses, many=True, context=serializer_context)
        return serializer.data


def handle_uploaded_file(file):
    extension = os.path.splitext(file.name)[1]
    new_filename = f"{uuid.uuid4()}{extension}"

    destination = open(f'static/user/images/{new_filename}', 'wb+')
    for chunk in file.chunks():
        destination.write(chunk)

    destination.close()
    return new_filename


def delete_file(filename):
    path = 'static/user/images/' + filename
    os.remove(path)


def validate_extension(filename):
    extension = os.path.splitext(filename)[1].replace(".", "")
    if extension.lower() not in ALLOWED_IMAGE_EXTENSIONS:
        raise serializers.ValidationError(
            (f'Invalid uploaded file type: {filename}'),
            code='invalid',
        )