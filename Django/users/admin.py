from django.contrib import admin
from users.models import User
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'first_name', 'last_name', 'city')
    list_filter = ('email', 'first_name', 'last_name',
                   'city', 'is_active', 'is_staff')
    ordering = ('-date_joined',)
    list_display = ('email', 'id', 'first_name', 'last_name', 'city',
                    'is_active', 'is_staff')
    fieldsets = ((None, {'fields': ('email', 'first_name', 'last_name', 'city', 'followed')}),
                 ('Permissions', {'fields': ('is_staff', 'is_active')}))

    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }

    add_fieldsets = (
        (None, {'classes': ('wide',), 'fields': ('email', 'first_name',
         'last_name', 'city', 'password1', 'password2', 'is_active', 'is_staff')})
    )


admin.site.register(User, UserAdminConfig)
