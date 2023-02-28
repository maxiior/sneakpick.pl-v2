from django.db import models
import uuid
from django.utils import timezone
from django.conf import settings

CATEGORY = ["id", "lc", "pc", "fit", "other"]

class Question(models.Model):
    CATEGORY = ((category, category) for category in CATEGORY)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    category = models.CharField(max_length=5, choices=CATEGORY)
    published = models.DateTimeField(default=timezone.now)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bumps = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="question_bumps", blank=True)
    views = models.IntegerField(default=0)
    item = models.CharField(max_length=200, blank=True)

    objects = models.Manager()

    def total_bumps(self):
        return self.bumps.count()

    def __str__(self):
        return self.title

class Image(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name='images')
    file_name = models.CharField(max_length=150)
    published = models.DateTimeField(default=timezone.now)