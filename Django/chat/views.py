from django.shortcuts import render
from .serializers import MessageSerializer, ConversationSerializer, MessageToSendSerializer
from .models import Message, Conversation
from users.models import User
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core import serializers
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from drf_yasg import openapi



class ConversationViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(responses={200: ConversationSerializer(many=True)})
    def list(self, request):
        """
        Get all conversations.
        Returns empty list if there are no conversations.
        """
        queryset = Conversation.objects.filter(user_one = request.user) | Conversation.objects.filter(user_two = request.user) 
        serializer = ConversationSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)


    @swagger_auto_schema(responses={200: "Ok"}, request_body=MessageToSendSerializer)
    def create(self, request) -> Response:
        """
        Send a message to a user specified in the request body.
        """
        receiver = User.objects.get(pk = request.data['receiver'])
        self.__send_message_to(receiver, request.data['content'])
        return Response("Message sent")

    @swagger_auto_schema(responses={200: MessageSerializer(many=True)})
    def retrieve(self, request, pk=None):
        """
        Retrieve a conversation with a user specified by user id in the url.
        """
        receiver = User.objects.get(pk = pk)
        conversation = self.__get_conversation_between(self.request.user, receiver)
        if conversation is None:
            return Response(list())
        return Response(MessageSerializer(conversation.messages.all(), many=True, context={'request': request}).data)

    
    def __get_conversation_between(self, user_one: User, user_two: User):
        conversation = Conversation.objects.filter(user_one=user_one, user_two=user_two) | Conversation.objects.filter(user_one=user_two, user_two=user_one)
        return conversation.first() if conversation.count() > 0 else None
    
    def __send_message_to(self, receiver_user: User, message):
        conversation = self.__get_conversation_between(self.request.user, receiver_user)
        if conversation is None:
            conversation = Conversation.objects.create(user_one = self.request.user, user_two = receiver_user)
            
        Message.objects.create(conversation = conversation, author = self.request.user, content = message)
        conversation.save()
        return conversation