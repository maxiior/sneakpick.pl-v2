from django.contrib import admin
from support.models import Ticket

# Register your models here.

class UserWatchlistAdmin(admin.ModelAdmin):
    model = Ticket
    search_fields = ('user__id', 'product__id', 'user__email', 'product__name', 'subject', 'message')
    list_filter = ('created_at', 'resolved')
    ordering = ('-created_at',)
    list_display = ('resolved', 'user', 'subject', 'product', 'product_id', 'created_at')
    fieldsets = (
        (None, {
            'fields': ('user', 'product', 'subject', 'message', 'created_at', 'resolved')}),
                )
    raw_id_fields = ('user', 'product')
    
admin.site.register(Ticket, UserWatchlistAdmin)