from django.db import models
from django.utils import timezone
from django.conf import settings


class Conversation(models.Model):
    user_one = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_one')
    user_two = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_two')

class Message(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages', default="")

    def __str__(self):
        return self.content
