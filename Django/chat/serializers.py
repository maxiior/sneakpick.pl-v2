from .models import Conversation, Message
from rest_framework import serializers


class MessageToSendSerializer(serializers.Serializer):
    receiver = serializers.CharField()
    content = serializers.CharField()

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('author', 'content', 'created_at')
        
class ConversationSerializer(serializers.ModelSerializer):
    message_count = serializers.SerializerMethodField()
    last_message_time = serializers.SerializerMethodField()
    last_message_content = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ('receiver', 'message_count', 'last_message_time', 'last_message_content')
        
    def get_message_count(self, obj):
        return obj.messages.count()
    
    def get_last_message_time(self, obj):
        return obj.messages.last().created_at
    
    def get_last_message_content(self, obj):
        return obj.messages.last().content
    
    def get_receiver(self, obj):
        if obj.user_one == self.context['request'].user:
            return obj.user_two.pk
        else:
            return obj.user_one.pk