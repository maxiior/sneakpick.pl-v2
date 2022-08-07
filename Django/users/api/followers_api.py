from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import CustomUserSerializer, UserIdSerializer
from users.models import Follower, User
from drf_yasg.utils import swagger_auto_schema
from core.APIViewExtension import GenericAPIViewFilter
from products.pagination import Pagination
from rest_framework import status


class FollowersAPI(APIView, Pagination):
    """
    Retrieve, update or delete a snippet instance.
    """

    def get_object(self, pk):
        try:
            return Follower.objects.get(following=pk)
        except Follower.DoesNotExist:
            return None

    filter_fields = ('id', 'first_name', 'last_name', 'email')

    @swagger_auto_schema(responses={200: CustomUserSerializer(many=True)}, paginator=Pagination())
    def get(self, request, pk, format=None):
        """
        Get all followers of a user specified by id.

        Filterings available: id, first_name, last_name, email
        Filtering could be used to determine if a user is following another user.
        Example url: /api/users/a4193f6a-4b23-4522-8acd-0f9c43e78e67/followers/?id=8707ac32-e3a2-4298-b549-f3430f255c79
        Gets all followers of user with id 8707ac32-e3a2-4298-b549-f3430f255c79
        """
        followers_id = Follower.objects.filter(
            following=pk).values_list('follower', flat=True)
        users_qs = User.objects.filter(id__in=followers_id)
        filtered_queryset = GenericAPIViewFilter().filter_queryset(request, users_qs, self)
        paginated_queryset = self.paginate_queryset(
            filtered_queryset, request, view=self)
        user_serializer = CustomUserSerializer(
            paginated_queryset, many=True, context={'request': request})
        return self.get_paginated_response(user_serializer.data)

    @swagger_auto_schema(request_body=UserIdSerializer, responses={201: ''})
    def post(self, request, pk, format=None):
        """
        Follow the user specified by pk
        """
        follower = User.objects.filter(id=pk).first()
        id_from_request_body = request.data.get('id')
        following = User.objects.filter(id=id_from_request_body).first()
        if follower != request.user:
            return Response({'Error': 'Cannot perform operation on another user'}, status=status.HTTP_400_BAD_REQUEST)

        exisitng_follower = Follower.objects.filter(
            follower=follower, following=following).first()
        if exisitng_follower:
            return Response({'Error': 'Already following'}, status=status.HTTP_400_BAD_REQUEST)
        if not following:
            return Response({'Error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        if follower.id == following.id:
            return Response(data="Cannot follow yourself", status=status.HTTP_400_BAD_REQUEST)
        else:
            follower = Follower.objects.create(
                follower=follower, following=following)
            follower.save()
            return Response(status=status.HTTP_201_CREATED)

    @swagger_auto_schema(responses={200: ''})
    def delete(self, request, pk, user_id, format=None):
        """
        Unfollow the user specified by pk
        """
        if pk != request.user.id:
            return Response({'Error': 'Cannot perform operation on another user'}, status=status.HTTP_400_BAD_REQUEST)
        following = User.objects.get(id=user_id)
        follower = request.user
        existing_follower = Follower.objects.filter(
            follower=follower, following=following).first()
        if follower.id == following.id:
            return Response(data="Cannot unfollow yourself", status=status.HTTP_400_BAD_REQUEST)
        if not existing_follower:
            return Response({'Error': 'Not following'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            existing_follower.delete()
            return Response(status=status.HTTP_200_OK)
