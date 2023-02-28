from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.db import models
from django.forms import Textarea

from users.models import User, Watchlist, Follower, ProfileComment, Address
from products.models import Product
from rest_framework_simplejwt.tokens import OutstandingToken


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', )
    ordering = ('-date_joined',)
    list_display = ('email', 'id', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined', 'total_products')
    fieldsets = ((None, {'fields': ('email', 'first_name', 'last_name', 'description', 'profile_photo')}),
                 ('Permissions', {'fields': ('is_staff', 'is_active')}))
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'fields': ('email', 'first_name', 'last_name', 'password', 'is_active', 'is_staff')}
         ),
    )

    
    def BE_AWARE_NO_WARNING_clear_tokens_and_delete(self, request, queryset):
        users = queryset.values("id")
        OutstandingToken.objects.filter(user__id__in=users).delete()
        queryset.delete()

    actions = ["BE_AWARE_NO_WARNING_clear_tokens_and_delete"]
    
    @admin.display(empty_value='0')
    def total_products(self, obj):
        return Product.objects.filter(owner=obj).count()

class UserWatchlistAdmin(admin.ModelAdmin):
    model = Watchlist
    search_fields = ('user__id', 'product__id', 'user__email', 'product__name')
    list_filter = ('created_at',)
    ordering = ('-created_at',)
    list_display = ('user', 'product', 'product_id', 'created_at')
    fieldsets = (
        (None, {
            'fields': ('user', 'product', 'created_at')}),
                )
    raw_id_fields = ('user', 'product')
     
     
class FollowersAdmin(admin.ModelAdmin):
    model = Follower
    search_fields = ('follower__id', 'following__id',
                     'follower__email', 'following__email',
                     'date_followed')
    list_filter = ('date_followed',)
    ordering = ('-date_followed',)
    list_display = ('follower', 'following', 'date_followed')
    fieldsets = (
        (None, {
            'fields': ('follower', 'following', 'date_followed')}),
                )
    raw_id_fields = ('following', 'follower')



class ProfileCommentsAdmin(admin.ModelAdmin):
    model = ProfileComment
    search_fields = ('author__id', 'related_user__id', 'created_at', 'content')
    list_filter = ('rating',)
    ordering = ('-created_at',)
    list_display = ('related_user', 'author', 'content', 'rating', 'created_at')
    fieldsets = (
        (None, {
            'fields': ('related_user', 'author', 'content', 'rating', 'created_at')}),
                )
    raw_id_fields = ('author', 'related_user')
    
class ProfileAdressAdmin(admin.ModelAdmin):
    model = Address
    search_fields = ('user__id', 'country', 'region', 'phone', 'zipcode')
    list_filter = ('country', 'city')
    ordering = ('-created_at',)
    list_display = ('user', 'country', 'zipcode', 'phone', 'created_at')
    fieldsets = (
        (None, {
            'fields': ('user', 'zipcode', 'country', 'region', 'city', 'address', 'phone')}),
                )
    raw_id_fields = ('user', )



admin.site.register(User, UserAdminConfig)
admin.site.register(Watchlist, UserWatchlistAdmin)
admin.site.register(Follower, FollowersAdmin)
admin.site.register(ProfileComment, ProfileCommentsAdmin)
admin.site.register(Address, ProfileAdressAdmin)
