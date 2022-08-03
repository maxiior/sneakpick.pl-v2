from unittest import skip
from django.test import TestCase
from django.urls import reverse
from ..models import Product
from users.models import User
import json
from rest_framework import status
from rest_framework.test import APIClient


# initialize the APIClient app
client = APIClient()


class ProductsTest(TestCase):

    def setUp(self):
        client.logout()
        User.objects.create(
            email="test@test.pl",
            password="password123"
        )

    def test_should_return_all_products_when_executed_default_endpoint(self):
        response = client.get(reverse("products:product-list"))

        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.content)
        pagination_data_count = 4
        self.assertEqual(len(response.data), Product.objects.all().count() + pagination_data_count)


    def test_product_model_should_have_required_properties(self):
        required_properties = [
            "name",
            "price",
            "category",
            "created_at",
            "owner",
            "description",
            "images"
        ]

        response = client.get(reverse("products:product-list"))

        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.content)

        for response_product in response.data['results']:
            for property in required_properties:
                self.assertIsNotNone(response_product[property])

    def test_should_not_create_product_without_authenticated_owner(self):
        valid_data = {
            "name": "test_name",
            "price": "19.99",
        }

        init_products_count = Product.objects.all().count()
        response = client.post(
            reverse("products:product-list"),
            valid_data,
            format="json"
        )

        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED, response.content)
        self.assertEqual(Product.objects.all().count(),
                         init_products_count)

    def test_should_not_create_product_when_missing_any_required_fields(self):
        test_user: User = User.objects.first()
        self.__authenticate_client(test_user)

        valid_data = {
            "name": "test_name",
            "price": "19.99",
        }

        init_products_count = Product.objects.all().count()

        for property in valid_data.keys():
            invalid_data = valid_data.copy()
            invalid_data.pop(property)

            response = client.post(
                reverse("products:product-list"),
                invalid_data,
                format="json"
            )

            self.assertEqual(response.status_code,
                             status.HTTP_400_BAD_REQUEST, response.content)
            self.assertEqual(Product.objects.all().count(),
                             init_products_count)

    def test_should_not_create_product_when_any_required_field_is_empty(self):
        test_user: User = User.objects.first()
        self.__authenticate_client(test_user)

        valid_data = {
            "name": "test_name",
            "price": "19.99",
        }

        init_products_count = Product.objects.all().count()

        for property in valid_data.keys():
            invalid_data = valid_data.copy()
            invalid_data[property] = ""

            response = client.post(
                reverse("products:product-list"),
                invalid_data,
                format="json"
            )

            self.assertEqual(response.status_code,
                             status.HTTP_400_BAD_REQUEST, response.content)
            self.assertEqual(Product.objects.all().count(),
                             init_products_count)

    def test_should_create_product_when_valid_data_is_given(self):
        test_user: User = User.objects.first()
        self.__authenticate_client(test_user)

        valid_data = self.__get_valid_product_data()

        init_products_count = Product.objects.all().count()

        response = client.post(
            reverse("products:product-list"),
            valid_data,
            format="json"
        )

        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED, response.content)
        self.assertNotEqual(Product.objects.all().count(),
                            init_products_count)

    def test_should_edit_existing_product_when_valid_data_is_given(self):
        test_user: User = User.objects.first()
        self.__authenticate_client(test_user)

        valid_data = self.__get_valid_product_data()

        response = client.post(
            reverse("products:product-list"),
            valid_data,
            format="json"
        )
        init_products_count = Product.objects.all().count()
        
        edited_data = {
            "name": "edited_name",
            "price": "25.12",
            "description": "somedescription_updated"
        }
        
        payload = {**valid_data, **edited_data}

        response = client.put(
            f'/api/products/{Product.objects.first().id}/',
            payload,
            format="json"
        )

        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.content)
        self.assertEqual(Product.objects.all().count(),
                         init_products_count)
        self.assertEqual(response.data["name"], edited_data["name"])
        self.assertEqual(response.data["price"], edited_data["price"])
        self.assertEqual(response.data["description"], edited_data["description"])

    def test_should_return_only_pagination_data_when_products_table_is_empty(self):
        Product.objects.all().delete()

        response = client.get(reverse("products:product-list"))

        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.content)
        self.assertEqual(json.loads(response.content), {
                         'count': 0, 'next': None, 'previous': None, 'results': []})

    def test_product_list_should_return_fixed_number_of_items_on_page(self):
        for i in range(50):
            Product.objects.create(owner=User.objects.first(), name="Test", price=10.0)
        products = [x for x in Product.objects.all()]

        response = client.get(reverse("products:product-list"))

        expected_items_number_on_page = 24

        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, response.content)
        self.assertEqual(len(json.loads(response.content)['results']), expected_items_number_on_page)

    def test_product_list_should_return_valid_items_within_page(self):
        for i in range(50):
            Product.objects.create(owner=User.objects.first(), name="Test", price=10.0)
        products = [x for x in Product.objects.all()]

        response = client.get(reverse("products:product-list"))
        items_from_response = json.loads(response.content)['results']

        for item in items_from_response:
            self.assertEqual(item['name'], "Test")
            self.assertEqual(item['price'], "10.00")

    def test_product_details_should_return_details_of_the_product(self):
        properties_to_check = [
            "owner",
            "name",
            "category",
            "description",
            "price",
            "published"
        ]

        Product.objects.all().delete()
        example_product = self.__get_valid_product_data()
        example_product.pop("delivery_methods")
        product = Product.objects.create(owner=User.objects.first(), **example_product)

        response = client.get(reverse("products:product-detail", kwargs={'pk': product.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        for property in properties_to_check:               
            self.assertTrue(response.data[property]) 

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
        
    def __get_valid_product_data(self) -> dict:
        return {
            "name": "test_name",
            "price": "19.99",
            "description": "somedescription",
            "category": "Katany",
            "condition": "New",
            "brand": "Nike",
            "colorway": "black",
            "size": "S",
            "fit": "Regular",
            "kind": "Męski",
            "delivery_methods": [{"price": "99", "delivery_time": "210","method": "Meeting", "city": "Konin" }]
        }
