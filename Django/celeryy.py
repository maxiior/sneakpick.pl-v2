from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from core.settings import PROJECT_NAME

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', f'{PROJECT_NAME}.settings')

app = Celery(PROJECT_NAME)
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()