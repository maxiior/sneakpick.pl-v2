from django.contrib import admin
from products.models import Product, ProductImage
from django.contrib.auth.admin import UserAdmin
from django.db import models
from django.forms import TextInput, Textarea, CharField
from django import forms


class ProductAdmin(admin.ModelAdmin):
    model = Product
    search_fields = ('name', 'price', 'category')
    list_filter = ('name', 'price', 'owner_id', 'category', 'bought')
    ordering = ('-published',)
    list_display = ('name', 'price', 'owner_id', 'category', 'kind', 'size', 'fit', 'published', 'bought')
    fieldsets = (
        (None, {'fields': ('name', 'price', 'description', 'category', 'kind', 'condition', 'size', 'fit', 'colorway', 'status', 'bought', 'bumps')}),

    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name', 'price', 'description', 'category')}
         ),)
    
class ProductImageAdmin(admin.ModelAdmin):
    model = ProductImage
    search_fields = ('file_name', 'created_at', 'product__id')
    list_filter = ('file_name', 'created_at', 'product_id', 'product__owner_id')
    ordering = ('-created_at',)
    list_display = ('file_name', 'created_at', 'product_id', 'product')
    fieldsets = (
        (None, {'fields': ('file_name', 'created_at', 'product', )}),

    )
    raw_id_fields = ('product',)
    
    


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
