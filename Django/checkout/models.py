from django.db import models
import uuid
from django.utils import timezone
from django.conf import settings
from users.models import Address
from products.models import Product, Delivery
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment
import sys




class PayPalClient:
     def __init__(self):
         self.client_id = "AaTuYTmaL_1zRLljUXU2Y3mikr3auDmv1ANPrQORULLQck2RKbCknCyRwl86p-rIIlu9b6-u1QQ4UbHJ"
         self.client_secret = "EGbXwM8NdlkgxMrkvqi9yeIBvIcYPYrkU2tpyt4AAVpRnJXp1rVi7iV9dNBTxl83XXdw9K0mkslnMAfz"
         self.environment = SandboxEnvironment(client_id=self.client_id, client_secret=self.client_secret)
         self.client = PayPalHttpClient(self.environment)

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_id = models.CharField(max_length=50, default = id, unique=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    order_time = models.DateTimeField(default=timezone.now)
    delivery =  models.ForeignKey(Delivery, on_delete=models.CASCADE)
    address =  models.ForeignKey(Address, on_delete=models.CASCADE)
    status =  models.BooleanField(default=False)

    
