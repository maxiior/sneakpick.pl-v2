from rest_framework.routers import DefaultRouter
from .views import ProductList

app_name = 'sneakpick_api'

router = DefaultRouter()
router.register('', ProductList, basename='product')
urlpatterns = router.urls
