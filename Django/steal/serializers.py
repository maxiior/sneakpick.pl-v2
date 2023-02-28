from rest_framework import serializers
from .models import Steal

class StealSerializer(serializers.ModelSerializer):
    store = serializers.SerializerMethodField()

    class Meta:
        model = Steal
        fields = ['link', 'published', 'type', 'name', 'store', 'markdown', 'description', 'rocket', 'alert']
        read_only_fields = ['owner', 'created_at', 'views']

    def get_store(self, obj):
        return {"name": obj.store.name, "photo": obj.store.photo}