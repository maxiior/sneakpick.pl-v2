from django.http.response import HttpResponseRedirect
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, viewsets, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .serializers import AddressSerializer, AddressUpdateSerializer, CustomUserSerializer, ProfileCommentSerializer, UserIdSerializer, UserUpdateSerializer, PswdUpdateSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from users.models import Follower, ProfileComment, User, Address, Watchlist
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.hashers import check_password
import jwt
from core.settings import SECRET_KEY, SIMPLE_JWT
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from core.APIViewExtension import GenericAPIViewFilter
from products.models import Product
from products.serializers import ProductSerializer, ProductIdSerializer
from rest_framework.pagination import LimitOffsetPagination
from products.pagination import Pagination
from .api.following_api import FollowingAPI
from .api.followers_api import FollowersAPI
from .api.product_watch_list_api import ProductWatchlistAPI


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CustomUserSerializer

    def get_object(self, queryset=None, **kwargs):
        id = self.kwargs.get('pk')
        return generics.get_object_or_404(User, id=id)


class UsersList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = User.object.all()
    serializer_class = CustomUserSerializer


class UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserUpdate(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer

    def get_object(self):
        return self.request.user


class AddressView(generics.GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

    def get(self, request, *args, **kwargs):
        id = request.user.id  # self.kwargs.get('pk')
        addresses = Address.objects.filter(user=id).order_by("created_at")
        serializer = AddressSerializer(
            addresses, many=True, context={'request': request, })
        return Response(serializer.data,  status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        serializer = AddressSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            address = serializer.save()
            if address:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddressUpdate(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddressUpdateSerializer

    def get_object(self, queryset=None, **kwargs):
        user = self.request.user.id
        id = self.kwargs.get('pk')
        return generics.get_object_or_404(Address, user=user, id=id)

    def delete(self, request, **kwargs):
        id = self.kwargs.get('pk')
        address = Address.objects.filter(user=request.user.id, id=id)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PasswordUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = PswdUpdateSerializer

    def get_object(self):
        return self.request.user


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            if(check_password(password, user.password)):
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                details = {
                    'id': user.id,
                    'email': user.email,
                    'access_token': str(refresh.access_token),
                    'expires_in': int(SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()),
                }
                response = Response(details, status=status.HTTP_200_OK)
                response.set_cookie('refresh_token',
                                    str(refresh),
                                    samesite='None',
                                    # httponly=True,     # should be enabled in production environment
                                    secure=True,       # should be enabled in production environment
                                    max_age=int(
                                        SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()),
                                    path="/",
                                    expires=int(SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()))
                response.set_cookie('access_token',
                                    str(access_token),
                                    # httponly=True,         # should be enabled in production environment
                                    secure=True,           # should be enabled in production environment
                                    samesite='None',
                                    max_age=int(
                                        SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()),
                                    path="/",
                                    expires=int(SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()))
                return response
            else:
                return Response({'Error': 'Wrong password'}, status.HTTP_403_FORBIDDEN)
        else:
            return Response({'Error': 'Account not active or bad request'}, status=status.HTTP_400_BAD_REQUEST)


class Refresh(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if request.COOKIES.get('refresh_token'):
            old_refresh = jwt.decode(request.COOKIES.get(
                'refresh_token'), SECRET_KEY, algorithms=["HS256"])

            user = User.objects.filter(id=old_refresh['user_id']).first()
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            details = {
                'id': user.id,
                'access_token': str(refresh.access_token),
                'expires_in': int(SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds())
            }

            response = Response(details, status=status.HTTP_200_OK)
            response.set_cookie('refresh_token',
                                str(refresh),
                                # httponly=True,         # should be enabled in production environment
                                secure=True,           # should be enabled in production environment
                                samesite='None',
                                max_age=int(
                                    SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()),
                                path="/",
                                expires=int(SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()))
            response.set_cookie('access_token',
                                str(access_token),
                                # httponly=True,         # should be enabled in production environment
                                secure=True,           # should be enabled in production environment
                                samesite='None',
                                max_age=int(
                                    SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()),
                                path="/",
                                expires=int(SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()))
            return response
        else:
            return Response({'Error': 'no refresh_token cookie'}, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if request.COOKIES.get('refresh_token') and request.COOKIES.get('access_token'):
            response = Response({}, status=status.HTTP_200_OK)
            # response.delete_cookie('refresh_token')
            response.set_cookie('refresh_token', secure=True,  # httponly=True, # should be enabled in production environment
                                samesite='None')
            response.set_cookie('access_token',  secure=True, samesite='None')
            return response
        else:
            return Response({'Error': 'can not remove cookies.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class ProfileCommentsAPI(APIView, Pagination):
    @swagger_auto_schema(responses={200: ProfileCommentSerializer(many=True)}, paginator=Pagination())
    def get(self, request, pk, format=None):
        """
        Get all comments for a user
        """
        user = User.objects.get(id=pk)
        comments = ProfileComment.objects.filter(
            related_user=user, parent=None)
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
            request.data["rating"] = 0
            parrent_comment = ProfileComment.objects.get(
                id=request.data["parent"])
            if ProfileComment.objects.filter(parent=parrent_comment).count() > 0:
                return Response({'Error': 'Cannot reply more than once'}, status=status.HTTP_400_BAD_REQUEST)
            if parrent_comment.parent is not None:
                return Response({'Error': 'Cannot reply to a reply'}, status=status.HTTP_400_BAD_REQUEST)

        comment_serializer = ProfileCommentSerializer(
            data=request.data, context={'request': request})
        # if data is not valid return error
        if comment_serializer.is_valid():
            comment_serializer.save(author=request.user, related_user=user)
            return Response(comment_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SingleAddressView(generics.RetrieveDestroyAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get_object(self, queryset=None, **kwargs):
        id = self.kwargs.get('pk')
        return generics.get_object_or_404(Address, id=id)


@api_view(['Delete'])
@permission_classes([IsAuthenticated])
def delete_comment_from_profile(request, pk, comment_id, format=None):

    if not ProfileComment.objects.filter(id=comment_id).exists():
        return Response({'Error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

    comment = ProfileComment.objects.get(id=comment_id)
    if comment.author == request.user:
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({'Error': 'Cannot delete comment, I am not an author'}, status=status.HTTP_400_BAD_REQUEST)
