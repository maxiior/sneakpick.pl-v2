import uuid
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from products.models import Product
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator



class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, password, first_name, last_name, city, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')
        return self.create_user(email, password, first_name, last_name, city, **other_fields)

    def create_user(self, email, password, first_name, last_name, city, **other_fields):
        if not email:
            raise ValueError(_('You must provide an email address'))
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, city=city, **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    city = models.CharField(max_length=150, blank=True)
    description = models.CharField(max_length=1000, blank=True) 
    profile_photo = models.CharField(max_length=500, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    avg_rating = models.FloatField(default=0)

    objects = CustomAccountManager()
    object = models.Manager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'city']


    def __str__(self):
        return self.email
    
class Follower(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    date_followed = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.follower.email + ' ' + self.following.email


class Address(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user =  models.ForeignKey(User, on_delete=models.CASCADE)
    zipcode = models.CharField(max_length=50)
    country = models.CharField(max_length=100)
    region = models.CharField(max_length=150)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=30)
    created_at = models.DateTimeField(default=timezone.now)
      
    class Meta:
        verbose_name = "Address"

class Watchlist(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'product')
        
class ProfileComment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    related_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments_received")
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='comments_added')
    rating = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    content = models.CharField(max_length=500)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = "Profile Comment"

