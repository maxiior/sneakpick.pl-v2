# Generated by Django 4.1.1 on 2022-10-07 10:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('talk', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='bumps',
            field=models.ManyToManyField(blank=True, related_name='question_bumps', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=150)),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='talk.question')),
            ],
        ),
    ]
