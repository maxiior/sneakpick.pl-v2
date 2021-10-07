import uuid
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator
from sneakpick.models import Product


class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, first_name, last_name, city, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')
        return self.create_user(email, first_name, last_name, city, password, **other_fields)

    def create_user(self, email, first_name, last_name, city, password, **other_fields):
        if not email:
            raise ValueError(_('You must provide an email address'))
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name,
                          last_name=last_name, city=city, **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    alphabets = RegexValidator(
        r'^[a-zA-Zęóąśłżźćń]*$', 'Only alphabets characters are allowed.')

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=100, validators=[alphabets])
    last_name = models.CharField(max_length=100, validators=[alphabets])
    city = models.CharField(max_length=100, validators=[alphabets])
    description = models.CharField(max_length=1000, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    followed = models.ManyToManyField(
        Product, related_name="followed_products", blank=True)

    objects = CustomAccountManager()
    object = models.Manager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'city']

    def __str__(self):
        return self.email
