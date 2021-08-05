from django.contrib import admin
from . import models


@admin.register(models.Product)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category',
                    'status', 'slug', 'owner')
    prepopulated_fields = {'slug': ('name',), }


admin.site.register(models.Category)
admin.site.register(models.Brand)
