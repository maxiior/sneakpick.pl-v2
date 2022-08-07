import json
from unittest import skip
from django.test import TestCase
from django.urls import reverse
from ..models import User
from rest_framework import status
from rest_framework.test import APIClient

# initialize the APIClient app
client = APIClient()

class UsersTest(TestCase):
    """ Test module """
    
    def setUp(self):
        client.logout()
        User.objects.create(
            email="test@test.pl",
            password="password123"
        )
        User.objects.create(
            email="user2@test.pl",
            password="password1234"
        )

    def test_user_detail_should_return_valid_user_data(self):
        properties_to_check = [
            "email",
            "first_name",
            "last_name"
        ]
        test_user = User.objects.first()

        response = client.get(reverse("users:user_detail", kwargs={'pk': test_user.id}))
        
        for property in properties_to_check:               
            self.assertEqual(response.data[property], getattr(test_user, property)) 

    def test_should_create_user_when_valid_data_is_given(self):
        valid_data = {
            "password": "Long_password1",
            "email" : "valid@email.pl"
        }

        init_users_count = User.objects.all().count()

        response = client.post(
            reverse("users:create_user"),
            valid_data,
            format="json"
            )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response.content)
        self.assertEqual(User.objects.all().count(), init_users_count + 1)
        
    def test_should_create_user_with_optional_data_when_valid_data_is_given(self):
        required_data = {
            "password": "Long_password1",
            "email" : "valid@email.pl"
        }
        optional_data = {
            "first_name": "John",
            "last_name": "Doe"
        }
              
        init_users_count = User.objects.all().count()

        response = client.post(
            reverse("users:create_user"),
            {**required_data, **optional_data},
            format="json"
            )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response.content)
        self.assertEqual(User.objects.all().count(), init_users_count + 1)
        for property in optional_data.keys():
            self.assertEqual(optional_data[property], response.data[property])

    def test_should_not_create_user_when_email_is_not_unique(self):
        invalid_data = {
            "username": "valid_unique_username",
            "password": "valid_password",
            "email" : User.objects.first().email
        }
        init_users_count = User.objects.all().count()

        response = client.post(
            reverse("users:create_user"),
            invalid_data,
            format="json"
            )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST, response.content)
        self.assertEqual(User.objects.all().count(), init_users_count)

    def test_should_not_create_user_when_missing_any_required_fields(self):
        valid_data = {
            "password": "valid_password",
            "email" : "valid_email@test.pl"
        }

        init_users_count = User.objects.all().count()

        for property in valid_data.keys():
            invalid_data = valid_data.copy()
            invalid_data.pop(property)

            response = client.post(
                reverse("users:create_user"),
                invalid_data,
                format="json"
                )

            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST, response.content)
            self.assertEqual(User.objects.all().count(), init_users_count)

    def test_should_not_create_user_when_any_required_field_is_empty(self):
        valid_data = {
            "password": "valid_password",
            "email" : "valid_email@test.pl"
        }
        init_users_count = User.objects.all().count()

        for property in valid_data.keys():
            invalid_data = valid_data.copy()
            invalid_data[property] = ""

            response = client.post(
                reverse("users:create_user"),
                invalid_data,
                format="json"
                )

            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST, response.content)
            self.assertEqual(User.objects.all().count(), init_users_count)

    def test_should_not_create_user_when_password_is_too_short(self):
        # get API response
        invalid_data = {
            "password": "1234567",          # min length = 8 
            "email" : "valid@email.pl"
        }
        init_users_count = User.objects.all().count()

        response = client.post(
            reverse("users:create_user"),
            invalid_data,
            format="json"
            )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST, response.content)
        self.assertEqual(User.objects.all().count(), init_users_count)

    def test_users_me_endpoint_should_return_unauthenticated_when_using_anonymous_user(self):
        response = client.get("/api/users/me/")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, response.content)

    def test_users_me_endpoint_should_return_authenticated_user_data(self):
        test_user: User = User.objects.first()
        self.__authenticate_client(test_user)

        response = client.get("/api/users/me/", )  

        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        self.assertEqual(response.data["email"], test_user.email)

    def test_jwt_endpoint_should_return_tokens_when_valid_user_given(self):
        test_user: User = User.objects.first()
        test_user.set_password("test")
        test_user.save()

        payload = {
            "email": test_user.email,
            "password": "test",
        }

        response = client.post(
            "/api/users/login/",
            payload,
            format="json"
            )
    
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        self.assertIsNotNone(response.data["access_token"])

    def __authenticate_client(self, user: User):
        payload = {
            "email": user.email,
            "password": user.password,
        }
        user.set_password(user.password)
        user.save()
        response = client.post(
            "/api/users/login/",
            payload,
            format="json"
            )
            
        access_token = response.data["access_token"]
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')