from django.db import models
from django.utils import timezone
from django.conf import settings
import uuid

# class Category(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name


# class Brand(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name


BRAND = [
    "nike",
    "adidas",
    "supreme",
    "puma",
    "new balance",
    "vans",
    "louis vuitton",
    "palace",
    "diadora",
    "moschino",
    "reebok",
    "balenciaga",
    "calvin klein",
    "gucci",
    "dsquared2",
    "lacoste",
    "yeezy",
    "off-white",
    "converse",
    "stone island",
    "the north face",
    "ralph lauren",
    "guess",
    "tommy hilfiger",
    "vlone",
    "inne"
]
CATEGORY = ["sneakersy", "hoodie", "teesy", "koszule", "crewnecki", "longsleevy", "katany", "kurtki", "płaszcze",
            "spodnie", "szale", "portfele", "plecaki", "zegarki", "czapki", "belty", "bielizna", "inne"]


class Product(models.Model):
    class ProductObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')
    objects = models.Manager()

    BRAND = ((brand, brand) for brand in BRAND)
    CATEGORY = ((category, category) for category in CATEGORY)
    STATUS_OPTIONS = (('draft', 'draft'), ('published', 'published'))
    CONDITION_OPTIONS = (('ds', 'ds'), ('vnds', 'vnds'), ('4', '4'), ('3', '3'), ('2', '2'), ('1', '1'))
    COLORWAY_OPTIONS = (('brown', 'brown'), ('red', 'red'), ('orange', 'orange'), ('yellow', 'yellow'),
                        ('green', 'green'), ('blue', 'blue'), ('purple', 'purple'), ('pink', 'pink'), ('black', 'black'), ('grey', 'grey'), ('white', 'white'), ('multi', 'multi'))
    KIND_OPTIONS = (('męski', 'męski'), ('damski', 'damski'))
    FIT_OPTIONS = (('slim fit', 'slim fit'), ('regular',
                   'regular'), ('oversize', 'oversize'))
    SIZE = (('xxs', 'xxs'), ('xs', 'xs'), ('s', 's'),
            ('m', 'm'), ('l', 'l'), ('xl', 'xl'), ('xxl', 'xxl'),
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
    brand = models.CharField(max_length=250, choices=BRAND)
    category = models.CharField(max_length=250, choices=CATEGORY)
    description = models.CharField(max_length=1000)
    kind = models.CharField(max_length=10, choices=KIND_OPTIONS)
    condition = models.CharField(max_length=5, choices=CONDITION_OPTIONS)
    size = models.CharField(max_length=5, choices=SIZE, blank=True, null=True)
    fit = models.CharField(
        max_length=10, choices=FIT_OPTIONS, blank=True)
    colorway = models.CharField(max_length=10, choices=COLORWAY_OPTIONS)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=10, choices=STATUS_OPTIONS, default="published")
    #ship = models.BooleanField()
    #meet = models.BooleanField()
    bought = models.BooleanField(default=False)
    bumps = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="product_bumps", blank=True)

    def total_bumps(self):
        return self.bumps.count()

    object = models.Manager()
    productobjects = ProductObjects()
    views = models.IntegerField(default=0)

    REQUIRED_FIELDS = ['name', 'category',
                       'price', 'condition', 'description']

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='images')
    file_name = models.CharField(max_length=150)
    created_at = models.DateTimeField(default=timezone.now)


class Delivery(models.Model):
    DELIVERY_OPTIONS = [("Meeting", "Meeting"), ("Polish Post",
                                                 "Polish Post"), ("DPD courier", "DPD courier")]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='delivery_methods')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    delivery_time = models.CharField(max_length=100, null=True)
    method = models.CharField(max_length=15, choices=DELIVERY_OPTIONS)
    city = models.CharField(max_length=150, null=True)

    REQUIRED_FIELDS = ['method']

    class Meta:
        verbose_name = ("Delivery Method")
