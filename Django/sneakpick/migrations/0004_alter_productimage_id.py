# Generated by Django 3.2.5 on 2021-10-08 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sneakpick', '0003_auto_20210904_1155'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimage',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]