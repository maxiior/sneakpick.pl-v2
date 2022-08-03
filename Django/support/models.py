from django.utils import timezone
from django.db import models
from users.models import User
from products.models import Product

# Create your models here.

class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    subject = models.CharField(max_length=100)
    message = models.TextField(max_length=1000)
    resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)