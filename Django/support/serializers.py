from rest_framework import serializers
from support.models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('user', 'product', 'subject', 'message', 'created_at')
        read_only_fields = ('id', 'created_at', 'user')