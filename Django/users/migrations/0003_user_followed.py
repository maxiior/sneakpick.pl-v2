# Generated by Django 3.1.7 on 2021-10-07 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sneakpick', '0003_auto_20210904_1155'),
        ('users', '0002_user_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='followed',
            field=models.ManyToManyField(blank=True, related_name='followed_products', to='sneakpick.Product'),
        ),
    ]
