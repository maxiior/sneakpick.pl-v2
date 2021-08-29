import uuid
from django.db import models
from django.utils import timezone
from django.conf import settings
from users.models import User


class Category(models.Model):
    name = models.CharField(primary_key=True, max_length=100)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(primary_key=True, max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    class ProductObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    STATUS_OPTIONS = (('draft', 'Draft'), ('published', 'Published'))
    CONDITION_OPTIONS = (('DS', 'DS'), ('VNDS', 'VNDS'), ('4/5', '4/5'),
                         ('3/5', '3/5'), ('2/5', '2/5'), ('1/5', '1/5'))
    COLORWAY_OPTIONS = (('brown', 'Brown'), ('red', 'Red'), ('orange', 'Orange'), ('yellow', 'Yellow'),
                        ('green', 'Green'), ('blue', 'Blue'), ('purple', 'Purple'), ('pink', 'Pink'), ('black', 'Black'), ('grey', 'Grey'), ('white', 'White'), ('multi', 'Multi'))
    KIND_OPTIONS = (('Męski', 'Męski'), ('Damski', 'Damski'))
    FIT_OPTIONS = (('Slim Fit', 'Slim Fit'), ('Regular',
                   'Regular'), ('Oversize', 'Oversize'))
    SIZE = (('XXS', 'XXS'), ('XS', 'XS'), ('S', 'S'),
            ('M', 'M'), ('L', 'L'), ('XL', 'XL'), ('XXL', 'XXL'),
            ('36.0', '36.0'), ('36.5', '36.5'), ('37.0', '37.0'),
            ('37.5', '37.5'), ('38.0', '38.0'), ('38.5', '38.5'),
            ('39.0', '39.0'), ('39.5', '39.5'), ('40.0', '40.0'),
            ('40.5', '40.5'), ('41.0', '41.0'), ('41.5', '41.5'),
            ('42.0', '42.0'), ('42.5', '42.5'), ('43.0', '43.0'),
            ('43.5', '43.5'), ('44.0', '44.0'), ('44.5', '44.5'),
            ('45.0', '45.0'), ('45.5', '45.5'), ('46.0', '46.0'),
            ('46.5', '46.5'), ('47.0', '47.0'), ('47.5', '47.5'),
            ('48.0', '48.0'), ('48.5', '48.5'), ('49.0', '49.0'),
            ('49.5', '49.5'), ('50.0', '50.0'))

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT)
    description = models.CharField(max_length=1000)
    kind = models.CharField(max_length=10, choices=KIND_OPTIONS)
    condition = models.CharField(max_length=5, choices=CONDITION_OPTIONS)
    size = models.CharField(max_length=5, choices=SIZE)
    fit = models.CharField(
        max_length=10, choices=FIT_OPTIONS, blank=True)
    colorway = models.CharField(max_length=10, choices=COLORWAY_OPTIONS)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=10, choices=STATUS_OPTIONS, default="published")
    ship = models.BooleanField()
    meet = models.BooleanField()
    bumps = models.ManyToManyField(
        User, related_name="product_bumps", blank=True)

    def total_bumps(self):
        return self.bumps.count()

    object = models.Manager()
    productobjects = ProductObjects()

    REQUIRED_FIELDS = ['name', 'category',
                       'price', 'condition', 'description']

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.name
