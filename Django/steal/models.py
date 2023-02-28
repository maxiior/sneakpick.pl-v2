from django.utils import timezone
from django.db import models
import uuid

class Store(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=30)
    photo = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Steal(models.Model):
    class StealObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')
    objects = models.Manager()

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    link = models.CharField(max_length=200, blank=False)
    published = models.DateTimeField(default=timezone.now)

    store =  models.ForeignKey(Store, on_delete=models.CASCADE, null=True, blank=True)
    type = models.CharField(max_length=10, blank=False)
    name = models.CharField(max_length=100, null=True, blank=True)
    markdown = models.CharField(max_length=20, null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    rocket = models.BooleanField(default=False, null=True, blank=True)
    alert = models.BooleanField(default=False, null=True, blank=True)

    REQUIRED_FIELDS = ['type', 'link']

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return str(self.id)

