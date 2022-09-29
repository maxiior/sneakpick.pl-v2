from django.urls import path
from .views import set_new_email, activate_new_email, AddressUpdate, AddressView, FollowersAPI, FollowingAPI, set_new_password, send_password_resetting_message, SingleAddressView, UsersList, PasswordUpdateView, UserDetail, UserUpdate, UserCreate, Login, ProductWatchlistAPI, ProfileCommentsAPI, Refresh, Logout, activate_user, send_email_changing_message

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
     
     path('email-update-message/', send_email_changing_message, name="email_update_message"),
     path('new-email/<uidb64>/<token>/', set_new_email, name="new_email"),
     path('email-activation/<uidb64>/<token>/', activate_new_email, name="email_activation"),

     path('address/', AddressView.as_view(), name='user_address'),
     path('address/<uuid:pk>', SingleAddressView.as_view(), name='address'),
     path('address/edit/<uuid:pk>/', AddressUpdate.as_view(), name='modify_address'),

     path('<uuid:pk>/profile-comments/',
          ProfileCommentsAPI.as_view(), name='user_profile_comments'),
     path('<uuid:pk>/profile-comments/<uuid:comment_id>/',
          ProfileCommentsAPI.as_view(), name='user_profile_comments_delete'),

     path('activate-user/<uidb64>/<token>/', activate_user, name='activate'),

     path('password-resetting-message/', send_password_resetting_message),
     path('new-password/<uidb64>/<token>/', set_new_password, name='reset'),

]
