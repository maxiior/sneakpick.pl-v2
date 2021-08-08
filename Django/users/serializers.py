from django.db.models import fields
from rest_framework import serializers
from users.models import NewUser
from .validators import MinimumLengthValidator, NumberValidator, UppercaseValidator, LowercaseValidator, SpecialCharactersValidator


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('email', 'first_name', 'last_name', 'city', 'password')
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
