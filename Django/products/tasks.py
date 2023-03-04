from celery import shared_task
import random
from .models import Product
from django.core.cache import cache

@shared_task
def randomize_product_to_quicksell():
    items = Product.objects.all()
    random_item = random.choice(items)
    cache.set("quicksell_product", random_item)