from django.http.response import HttpResponseRedirect
from django.urls import path, include, re_path
from rest_framework.permissions import IsAuthenticated
from .views import AddressUpdate, AddressView, FollowersAPI, FollowingAPI, SingleAddressView, UsersList, PasswordUpdateView, UserDetail, UserUpdate, UserCreate, Login, ProductWatchlistAPI, ProfileCommentsAPI, Refresh, Logout
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import api_view, permission_classes
from users import views

app_name = 'users'


urlpatterns = [
    path('', UsersList.as_view(), name='user_list'),
    path('<uuid:pk>/', UserDetail.as_view(), name='user_detail'),
    path('register/', UserCreate.as_view(), name="user_create"),
    path('edit/', UserUpdate.as_view(), name="user_edit"),
    path('login/', Login.as_view(), name='login'),
    path('refresh/', Refresh.as_view(), name='refresh'),
    path('logout/', Logout.as_view(), name='logout'),
    path('<uuid:pk>/followed-products/',
         ProductWatchlistAPI.as_view(), name='user_followed_products'),
    path('<uuid:pk>/followed-products/<uuid:product_id>/',
         ProductWatchlistAPI.as_view(), name='user_followed_products'),
    path('<uuid:pk>/followers/', FollowersAPI.as_view(), name='user_followers'),
    path('<uuid:pk>/followers/<uuid:user_id>/',
         FollowersAPI.as_view(), name='user_unfollow_other_user'),
    path('<uuid:pk>/following/', FollowingAPI.as_view(), name='user_following'),

    path('password-update/', PasswordUpdateView.as_view(), name="password_update"),
    path('address/', AddressView.as_view(), name='user_address'),
    path('address/<uuid:pk>', SingleAddressView.as_view(), name='address'),
    path('address/edit/<uuid:pk>/', AddressUpdate.as_view(), name='modify_address'),
    path('<uuid:pk>/profile-comments/',
         ProfileCommentsAPI.as_view(), name='user_profile_comments'),
    path('<uuid:pk>/profile-comments/<uuid:comment_id>/',
         views.delete_comment_from_profile, name='user_profile_comments_delete'),
]
