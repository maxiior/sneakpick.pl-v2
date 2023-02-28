from base64 import urlsafe_b64decode
import email
from re import sub
from django.http.response import HttpResponseRedirect
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, viewsets, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .serializers import AddressSerializer, AddressUpdateSerializer, CustomUserSerializer, ProfileCommentSerializer, UserIdSerializer, UserUpdateSerializer, PasswordUpdateSerializer, LoginSerializer
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
from core.pagination import Pagination
from .api.following_api import FollowingAPI
from .api.followers_api import FollowersAPI
from .api.product_watch_list_api import ProductWatchlistAPI
from .api.profile_comments_api import ProfileCommentsAPI
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from .utils import activation_token_generator, password_reset_token_generator, email_changing_token_generator
from django.core.mail import EmailMessage
from django.conf import settings
import time

from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.core.cache import cache

class TopUsersList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = User.object.all()
    serializer_class = CustomUserSerializer

    def get(self, request):
        
        print(self.queryset.order_by("-avg_rating")[:5])
        serialized = self.serializer_class(self.queryset)

        

        return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def activate_new_email(request, uidb64, token):
    try:
        uid = force_str(urlsafe_b64decode(uidb64))
        user = User.object.get(pk=uid)
    except Exception as e:
        user=None

    if user and email_changing_token_generator.check_token(user,token):
        user.email = cache.get("new_email_" + str(user.id))
        user.save()
        cache.delete("new_email_" + str(user.id))
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(['PUT'])
def set_new_email(request, uidb64, token):
    password = request.data['password']
    new_email = request.data['new_email']

    try:
        uid = force_str(urlsafe_b64decode(uidb64))
        user = User.object.get(pk=uid)
    except:
        user=None
    
    if user and cache.get("email_changing_message_" + str(user.id)) == token:
        if not user.check_password(password):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        if new_email == user.email:
            return Response(status=status.HTTP_403_FORBIDDEN)

        cache.set("new_email_" + str(uid), new_email, settings.PASSWORD_RESET_TIMEOUT)
        
        email_subject = "Aktywuj nowy adres e-mail konta Sneakpick"
        email_body = render_to_string('new_email_activation/index.html', {
            'user': user,
            'domain': settings.FRONTEND_APP_ADDRESS,
            'uidb64': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': email_changing_token_generator.make_token(user)
        })

        email=EmailMessage(subject=email_subject, body=email_body, from_email=settings.EMAIL_FROM_USER, to=[new_email])
        email.content_subtype='html'
        email.send()
        cache.delete("email_changing_message_" + str(user.id))

        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_email_changing_message(request):
    password = request.data['password']
    user = request.user

    if not user.check_password(password):
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    token = email_changing_token_generator.make_token(user)
    cache.set("email_changing_message_" + str(user.id), token, settings.PASSWORD_RESET_TIMEOUT)
    
    email_subject = "Zmiana adresu e-mail konta Sneakpick"
    email_body = render_to_string('email_changing/index.html', {
        'user': user,
        'domain': settings.FRONTEND_APP_ADDRESS,
        'uidb64': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': token
    })

    email=EmailMessage(subject=email_subject, body=email_body, from_email=settings.EMAIL_FROM_USER, to=[user])
    email.content_subtype='html'
    email.send()
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def send_password_resetting_message(request):
    email = request.data['email']

    if User.objects.filter(email=email).exists():
        user = User.objects.get(email=email)

        email_subject = "Resetowanie hasła konta Sneakpick"
        email_body = render_to_string('password_resetting/index.html', {
            'user': user,
            'domain': settings.FRONTEND_APP_ADDRESS,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': password_reset_token_generator.make_token(user)
        })

        email=EmailMessage(subject=email_subject, body=email_body, from_email=settings.EMAIL_FROM_USER, to=[email])
        email.content_subtype='html'
        email.send()
    return Response(status=status.HTTP_200_OK)
        
@api_view(['PUT'])
def set_new_password(request, uidb64, token):
    try:
        uid = force_str(urlsafe_b64decode(uidb64))
        user = User.object.get(pk=uid)
    except:
        user=None
    
    if user and password_reset_token_generator.check_token(user, token):
        user.set_password(request.data['password'])
        user.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_403_FORBIDDEN)

def send_activation_email(user, request):
    email_subject = "Aktywuj Twoje konto Sneakpick"
    email_body = render_to_string('authentication/index.html', {
        'user': user,
        'domain': settings.FRONTEND_APP_ADDRESS,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': activation_token_generator.make_token(user)
    })

    email=EmailMessage(subject=email_subject, body=email_body, from_email=settings.EMAIL_FROM_USER, to=[user.email])
    email.content_subtype='html'
    email.send()

@api_view(['POST'])
def activate_user(request, uidb64, token):
    try:
        uid = force_str(urlsafe_b64decode(uidb64))
        user = User.object.get(pk=uid)
    except Exception as e:
        user=None

    if user and activation_token_generator.check_token(user,token):
        user.is_active = True
        user.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_403_FORBIDDEN)

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
        try:
            email = request.data['email']
            user = User.objects.get(email=email)

            if time.time() - time.mktime(user.date_joined.timetuple()) > settings.PASSWORD_RESET_TIMEOUT and not user.is_active:
                User.objects.filter(email=email).delete()
        except:
            pass

        serializer = CustomUserSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                send_activation_email(user, request)
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
    serializer_class = PasswordUpdateSerializer

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
            if check_password(password, user.password):
                if user.is_active:
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
                    return Response({'Error': 'Account not active'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'Error': 'Wrong password'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'Error': 'Account not exist'}, status=status.HTTP_404_NOT_FOUND)


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
                'email': user.email,
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


class SingleAddressView(generics.RetrieveDestroyAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get_object(self, queryset=None, **kwargs):
        id = self.kwargs.get('pk')
        return generics.get_object_or_404(Address, id=id)


