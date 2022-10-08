from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.serializers import ProfileCommentSerializer
from users.models import ProfileComment, User
from drf_yasg.utils import swagger_auto_schema
from core.pagination import Pagination

class ProfileCommentsAPI(APIView, Pagination):
    @swagger_auto_schema(responses={200: ProfileCommentSerializer(many=True)}, paginator=Pagination())
    def get(self, request, pk, format=None):
        """
        Get all comments for a user
        """
        user = User.objects.get(id=pk)
        comments = ProfileComment.objects.filter(
            related_user=user, parent=None).order_by("-created_at")
        paginated_comments = self.paginate_queryset(
            comments, request, view=self)
        serializer = ProfileCommentSerializer(
            paginated_comments, many=True, context={'request': request})
        return self.get_paginated_response(serializer.data)

    @swagger_auto_schema(request_body=ProfileCommentSerializer, responses={201: ''})
    def post(self, request, pk, format=None):
        """
        Add a comment to a user
        **author** field is not required. it is swagger bug that this fields appear in the request body
        """

        user = User.objects.get(id=pk)
        if user == request.user and ("parent" not in request.data or request.data["parent"] is None):
            return Response({'Error': 'Cannot comment on yourself'}, status=status.HTTP_400_BAD_REQUEST)

        if "parent" in request.data and request.data["parent"] is not None:
            if pk != request.user.id:
                return Response({'Error': 'Cannot reply on another user profile'}, status=status.HTTP_400_BAD_REQUEST)
            parrent_comment = ProfileComment.objects.get(id=request.data["parent"])
            if ProfileComment.objects.filter(parent=parrent_comment).count() > 0:
                return Response({'Error': 'Cannot reply more than once'}, status=status.HTTP_400_BAD_REQUEST)
            if parrent_comment.parent is not None:
                return Response({'Error': 'Cannot reply to a reply'}, status=status.HTTP_400_BAD_REQUEST)
        elif not 'content' in request.data or not 'rating' in request.data:
            return Response({'Error': 'Request need to has content and rating fields'}, status=status.HTTP_400_BAD_REQUEST)

        comment_serializer = ProfileCommentSerializer(data=request.data, context={'request': request})

        if comment_serializer.is_valid():
            if "parent" not in request.data or request.data["parent"] is None:
                comments_count = ProfileComment.objects.filter(related_user=user).count()+1
                avg_rating = (user.avg_rating*(comments_count-1) + request.data["rating"]) / float(comments_count)
                User.objects.filter(id=pk).update(avg_rating=avg_rating)
                comment_serializer.save(author=request.user, related_user=user)
                return Response({"comment": comment_serializer.data, "avg_rating": avg_rating}, status=status.HTTP_201_CREATED)
            else:
                comment_serializer.save(author=request.user, related_user=user)
                return Response(comment_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, comment_id, format=None):
        if not ProfileComment.objects.filter(id=comment_id).exists():
            return Response({'Error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

        comment = ProfileComment.objects.get(id=comment_id)
        if comment.author == request.user:
            comments_count = ProfileComment.objects.filter(related_user=comment.related_user).count()
            user = User.objects.get(id=comment.related_user.id)
            avg_rating = 0 if comments_count-1 == 0 else (user.avg_rating*comments_count - comment.rating) / float(comments_count-1)
            User.objects.filter(id=user.id).update(avg_rating=avg_rating)

            comment.delete()
            return Response({"avg_rating": avg_rating}, status=status.HTTP_200_OK)
        else:
            return Response({'Error': 'Cannot delete comment, because you are not its author.'}, status=status.HTTP_400_BAD_REQUEST)