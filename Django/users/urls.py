from django.urls import path
from .views import BlacklistTokenView, CustomUserCreate, UserDetail

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
    path('<uuid:pk>', UserDetail.as_view(), name='user_detail')
]
