# Generated by Django 4.1.1 on 2023-03-02 19:53

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=150)),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=1000)),
                ('category', models.CharField(choices=[('id', 'id'), ('lc', 'lc'), ('pc', 'pc'), ('fit', 'fit'), ('other', 'other')], max_length=5)),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('views', models.IntegerField(default=0)),
                ('item', models.CharField(blank=True, max_length=200)),
            ],
        ),
    ]
