from django.contrib import admin
from .models import Question, Image
from django.db import models
from django.forms import TextInput, Textarea, CharField
from django import forms


class QuestionAdmin(admin.ModelAdmin):
    model = Question
    search_fields = ('title', 'category', 'item')
    list_filter = ('title', 'category', 'item', 'owner_id')
    ordering = ('-published',)
    list_display = ('title', 'description', 'category', 'item', 'published', 'owner_id', 'views')
    fieldsets = (
        (None, {'fields': ('title', 'description', 'category', 'item', 'published', 'bumps', 'views')}),

    )
    
class ImageAdmin(admin.ModelAdmin):
    model = Image
    search_fields = ('file_name', 'published', 'question__id')
    list_filter = ('file_name', 'published', 'question_id', 'question__owner_id')
    ordering = ('-published',)
    list_display = ('question_id', 'file_name', 'published')
    fieldsets = (
        (None, {'fields': ('file_name', 'published', 'question' )}),

    )
    
    


admin.site.register(Question, QuestionAdmin)
admin.site.register(Image, ImageAdmin)