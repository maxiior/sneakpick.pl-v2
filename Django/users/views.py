from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from users.models import User
from rest_framework import generics
from .serializers import UserSerializer, MyUserSerializer, UserJustCitySerializer, UserUpdateSerializer, LoginSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import check_password
from core.settings import SECRET_KEY, SIMPLE_JWT
import jwt


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            newuser = reg_serializer.save()
            if newuser:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class OtherUserDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = User.object.all()
    serializer_class = UserSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return generics.get_object_or_404(User, id=item)


class UserCity(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = User.object.all()
    serializer_class = UserJustCitySerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return generics.get_object_or_404(User, id=item)


class UserUpdate(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer

    def get_object(self):
        return self.request.user


class Login(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            if(check_password(password, user.password)):
                details = {}
                refresh = RefreshToken.for_user(user)
                details['email'] = user.email
                details['access_token'] = str(refresh.access_token)
                details['expires_in'] = int(
                    SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds())
                details['id'] = user.id
                response = Response(details, status=status.HTTP_200_OK)
                response.set_cookie('refresh_token', str(refresh), httponly=True, secure=True,  samesite='None',
                                    max_age=300, path="/", expires=int(SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()))
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
            details = {}
            details['access_token'] = str(refresh.access_token)
            details['expires_in'] = int(
                SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds())
            details['id'] = user.id
            response = Response(details, status=status.HTTP_200_OK)
            response.set_cookie('refresh_token', str(refresh), httponly=True, secure=True,  samesite='None', max_age=300, path="/", expires=int(
                SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()))
            return response
        else:
            return Response({'Error': 'no refresh_token cookie'}, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if request.COOKIES.get('refresh_token'):
            response = Response({}, status=status.HTTP_200_OK)
            # response.delete_cookie('refresh_token')
            response.set_cookie('refresh_token', httponly=True,
                                secure=True,  samesite='None')
            return response
        else:
            return Response({'Error': 'can not remove cookies'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_user_detail(request):
    return Response(MyUserSerializer(request.user).data)
