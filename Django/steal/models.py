from django.utils import timezone
from django.db import models
import uuid
from core import settings

CATEGORY = (('promka', 'promka'), ('drop', 'drop'), ('ea', 'ea'), ('steal', 'steal'))

class Steal(models.Model):
    class StealObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')
    objects = models.Manager()

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    published = models.DateTimeField(default=timezone.now)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.CharField(max_length=10, blank=False, choices=CATEGORY)
    header = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=1000, null=True, blank=True)
    link = models.CharField(max_length=1000, blank=False)
    markdown = models.CharField(max_length=20, null=True, blank=True)
    rocket = models.BooleanField(default=False, null=True, blank=True)
    alert = models.BooleanField(default=False, null=True, blank=True)
    photo = models.CharField(max_length=200, blank=True)

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return str(self.id)

class Store(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    store_name = models.CharField(max_length=100)
    photo = models.CharField(max_length=200, blank=False)

    def __str__(self):
        return str(self.id)