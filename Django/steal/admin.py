from django.contrib import admin
from .models import Steal, Store
from django.db import models
from django.forms import Textarea

class StealAdmin(admin.ModelAdmin):
    model = Steal
    search_fields = ('name', 'price', 'category')
    list_filter = ('name', 'alert', 'rocket', 'type', 'published')
    ordering = ('-published',)
    list_display = ('link', 'published', 'type', 'name', 'markdown', 'rocket', 'alert')
    fieldsets = (
        (None, {'fields': ('link', 'published', 'store', 'type', 'name', 'markdown', 'description', 'rocket', 'alert')}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name', 'alert', 'rocket', 'type', 'published')}
         ),)


class StoreAdmin(admin.ModelAdmin):
    model = Store
    search_fields = ('name',)
    list_filter = ('name',)
    list_display = ('name',)
    fieldsets = (
        (None, {'fields': ('name', 'photo')}),
    )  
    

admin.site.register(Steal, StealAdmin)
admin.site.register(Store, StoreAdmin)