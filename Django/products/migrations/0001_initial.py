# Generated by Django 4.0.6 on 2022-07-16 15:19

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('delivery_time', models.CharField(max_length=100, null=True)),
                ('method', models.CharField(choices=[('Meeting', 'Meeting'), ('Polish Post', 'Polish Post'), ('DPD courier', 'DPD courier')], max_length=15)),
                ('city', models.CharField(max_length=150, null=True)),
            ],
            options={
                'verbose_name': 'Delivery Method',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=250)),
                ('brand', models.CharField(choices=[('Nike', 'Nike'), ('Adidas', 'Adidas'), ('Supreme', 'Supreme'), ('Puma', 'Puma'), ('New Balance', 'New Balance'), ('Vans', 'Vans'), ('Louis Vuitton', 'Louis Vuitton'), ('Palace', 'Palace'), ('Diadora', 'Diadora'), ('Moschino', 'Moschino'), ('Reebok', 'Reebok'), ('Balenciaga', 'Balenciaga'), ('Calvin Klein', 'Calvin Klein'), ('Gucci', 'Gucci'), ('Dsquared2', 'Dsquared2'), ('Lacoste', 'Lacoste'), ('Yeezy', 'Yeezy'), ('Off-White', 'Off-White'), ('Converse', 'Converse'), ('Stone Island', 'Stone Island'), ('The North Face', 'The North Face'), ('Ralph Lauren', 'Ralph Lauren'), ('Guess', 'Guess'), ('Tommy Hilfiger', 'Tommy Hilfiger'), ('VLONE', 'VLONE'), ('Inne', 'Inne')], max_length=250)),
                ('category', models.CharField(choices=[('Buty', 'Buty'), ('Bluzy', 'Bluzy'), ('Koszulki', 'Koszulki'), ('Koszule', 'Koszule'), ('Bluzki', 'Bluzki'), ('Katany', 'Katany'), ('Kurtki', 'Kurtki'), ('Płaszcze', 'Płaszcze'), ('Spodnie', 'Spodnie'), ('Szale', 'Szale'), ('Portfele', 'Portfele'), ('Plecaki', 'Plecaki'), ('Zegarki', 'Zegarki'), ('Czapki', 'Czapki'), ('Paski', 'Paski'), ('Bielizna', 'Bielizna'), ('Inne', 'Inne')], max_length=250)),
                ('description', models.CharField(max_length=1000)),
                ('kind', models.CharField(choices=[('Męski', 'Męski'), ('Damski', 'Damski')], max_length=10)),
                ('condition', models.CharField(choices=[('New', 'New'), ('Used', 'Used')], max_length=5)),
                ('size', models.CharField(blank=True, choices=[('XXS', 'XXS'), ('XS', 'XS'), ('S', 'S'), ('M', 'M'), ('L', 'L'), ('XL', 'XL'), ('XXL', 'XXL'), ('36.0', '36.0'), ('36.5', '36.5'), ('37.0', '37.0'), ('37.5', '37.5'), ('38.0', '38.0'), ('38.5', '38.5'), ('39.0', '39.0'), ('39.5', '39.5'), ('40.0', '40.0'), ('40.5', '40.5'), ('41.0', '41.0'), ('41.5', '41.5'), ('42.0', '42.0'), ('42.5', '42.5'), ('43.0', '43.0'), ('43.5', '43.5'), ('44.0', '44.0'), ('44.5', '44.5'), ('45.0', '45.0'), ('45.5', '45.5'), ('46.0', '46.0'), ('46.5', '46.5'), ('47.0', '47.0'), ('47.5', '47.5'), ('48.0', '48.0'), ('48.5', '48.5'), ('49.0', '49.0'), ('49.5', '49.5'), ('50.0', '50.0')], max_length=5, null=True)),
                ('fit', models.CharField(blank=True, choices=[('Slim Fit', 'Slim Fit'), ('Regular', 'Regular'), ('Oversize', 'Oversize')], max_length=10)),
                ('colorway', models.CharField(choices=[('brown', 'Brown'), ('red', 'Red'), ('orange', 'Orange'), ('yellow', 'Yellow'), ('green', 'Green'), ('blue', 'Blue'), ('purple', 'Purple'), ('pink', 'Pink'), ('black', 'Black'), ('grey', 'Grey'), ('white', 'White'), ('multi', 'Multi')], max_length=10)),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('slug', models.SlugField(max_length=250, unique_for_date='published')),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='published', max_length=10)),
                ('bought', models.BooleanField(default=False)),
                ('views', models.IntegerField(default=0)),
            ],
            options={
                'ordering': ('-published',),
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='products.product')),
            ],
        ),
    ]
