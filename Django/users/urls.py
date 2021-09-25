from django.urls import path
from .views import BlacklistTokenView, CustomUserCreate, OtherUserDetail, UserCity, UserUpdate, my_user_detail, Login, Refresh, Logout

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
    path('<uuid:pk>', OtherUserDetail.as_view(), name='user_detail'),
    path('city/<uuid:pk>', UserCity.as_view(), name='user_city'),
    path('edit/', UserUpdate.as_view(), name="edit_user"),
    path('me/', my_user_detail, name="my_user_details"),
    path('login/', Login.as_view(), name='login'),
    path('refresh/', Refresh.as_view(), name='refresh'),
    path('logout/', Logout.as_view(), name='logout')
]
