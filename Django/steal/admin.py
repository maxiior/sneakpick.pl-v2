from django.contrib import admin
from .models import Steal, Store
from django.db import models
from django.forms import Textarea

class StealAdmin(admin.ModelAdmin):
    model = Steal
    search_fields = ('header', 'price', 'category')
    list_filter = ('header', 'alert', 'rocket', 'photo', 'category', 'published')
    ordering = ('-published',)
    list_display = ('link', 'published', 'category', 'photo', 'header', 'markdown', 'rocket', 'alert')
    fieldsets = (
        (None, {'fields': ('link', 'published', 'category', 'photo', 'header', 'markdown', 'description', 'rocket', 'alert')}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('header', 'alert', 'rocket', 'category', 'published')}
         ),)


class StoreAdmin(admin.ModelAdmin):
    model = Store
    search_fields = ('store_name',)
    list_filter = ('store_name',)
    list_display = ('store_name',)
    fieldsets = (
        (None, {'fields': ('store_name', 'photo')}),
    )  
    

admin.site.register(Steal, StealAdmin)
admin.site.register(Store, StoreAdmin)