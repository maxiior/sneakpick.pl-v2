# Generated by Django 3.1.7 on 2021-08-06 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sneakpick', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brand',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='category',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='product',
            name='clothes_size',
            field=models.CharField(choices=[('XXS', 'XXS'), ('XS', 'XS'), ('S', 'S'), ('M', 'M'), ('L', 'L'), ('XL', 'XL'), ('XXL', 'XXL')], max_length=5),
        ),
        migrations.AlterField(
            model_name='product',
            name='condition',
            field=models.CharField(choices=[('DS', 'DS'), ('VNDS', 'VNDS'), ('4/5', '4/5'), ('3/5', '3/5'), ('2/5', '2/5'), ('1/5', '1/5')], max_length=5),
        ),
        migrations.AlterField(
            model_name='product',
            name='fit',
            field=models.CharField(choices=[('Slim Fit', 'Slim Fit'), ('Regular', 'Regular'), ('Oversize', 'Oversize')], max_length=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='product',
            name='kind',
            field=models.CharField(choices=[('Męski', 'Męski'), ('Damski', 'Damski')], max_length=10),
        ),
    ]