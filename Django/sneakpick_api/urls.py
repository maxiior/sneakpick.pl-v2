from rest_framework import urlpatterns
from .views import ProductList
from rest_framework.routers import DefaultRouter

app_name = 'sneakpick_api'

router = DefaultRouter()
router.register('', ProductList, basename='product')
urlpatterns = router.urls

# urlpatterns = [
#    path('<int:pk>/', ProductDetail.as_view(), name='detailcreate'),
#    path('?limit=<int:limit>&offset=<int:offset>/',
#         ProductList.as_view(), name='listcreate'),
#    path('', ProductList.as_view(), name='listcreate'),
# ]
