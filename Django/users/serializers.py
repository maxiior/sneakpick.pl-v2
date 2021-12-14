from rest_framework import serializers
from users.models import User
from .validators import MinimumLengthValidator, NumberValidator, UppercaseValidator, LowercaseValidator, SpecialCharactersValidator


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name',
                  'city', 'password', 'description']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def validate_password(self, password):
        MinimumLengthValidator().validate(password)
        NumberValidator().validate(password)
        UppercaseValidator().validate(password)
        LowercaseValidator().validate(password)
        SpecialCharactersValidator().validate(password)
        return password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'city']


class UserJustCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['city']


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name',
                  'city', 'city', 'description']

        def update(self, instance, validated_data):
            if instance.user == self.context['request'].user:
                instance.email = validated_data.get('email', instance.email)
                instance.first_name = validated_data.get(
                    'first_name', instance.first_name)
                instance.last_name = validated_data.get(
                    'last_name', instance.last_name)
                instance.city = validated_data.get('city', instance.city)
                instance.description = validated_data.get(
                    'description', instance.description)
                instance.save()

            return instance

    def __init__(self, *args, **kwargs):
        super(UserUpdateSerializer, self).__init__(*args, **kwargs)
        self.fields['email'].required = False
        self.fields['description'].required = False


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
