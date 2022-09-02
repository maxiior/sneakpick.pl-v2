from rest_framework.views import APIView
from ..serializers import CustomUserSerializer
from users.models import Follower, User
from drf_yasg.utils import swagger_auto_schema
from core.APIViewExtension import GenericAPIViewFilter
from core.pagination import Pagination


class FollowingAPI(APIView, Pagination):
    filter_fields = ('id', 'first_name', 'last_name', 'email')

    @swagger_auto_schema(responses={200: CustomUserSerializer(many=True)}, paginator=Pagination())
    def get(self, request, pk, format=None):
        """
        Get all users followed by user specified by id.

        Filterings available: id, first_name, last_name, email
        Filtering could be used to determine if a user is following another user.
        Example url: /api/users/a4193f6a-4b23-4522-8acd-0f9c43e78e67/following/?id=8707ac32-e3a2-4298-b549-f3430f255c79
        Gets all users followed by user with id 8707ac32-e3a2-4298-b549-f3430f255c79
        """
        followings_id = Follower.objects.filter(
            follower=pk).values_list('following', flat=True)
        users_qs = User.objects.filter(id__in=followings_id)
        filtered_queryset = GenericAPIViewFilter().filter_queryset(request, users_qs, self)
        paginated_queryset = self.paginate_queryset(
            filtered_queryset, request, view=self)
        user_serializer = CustomUserSerializer(
            paginated_queryset, many=True, context={'request': request})
        return self.get_paginated_response(user_serializer.data)
