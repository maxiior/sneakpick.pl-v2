from django.http import response
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from sneakpick.models import Product, Category
from django.contrib.auth.models import User
from rest_framework.test import APIClient


class ProductTests(APITestCase):
    def test_view_products(self):
        url = reverse('sneakpick_api:listcreate')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_product(self):
        self.test_category = Category.objects.create(name='django')
        self.testuser1 = User.objects.create_superuser(
            username='test_user1', password='123456789')
        self.client.login(username=self.testuser1.username,
                          password='123456789')
        data = {"title": "new", "author": 1,
                "excerpt": "new", "content": "new"}
        url = reverse('sneakpick_api:listcreate')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_update(self):
        client = APIClient()
        self.test_category = Category.objects.create(name='django')
        self.testuser1 = User.objects.create_user(
            username='test_user1', password='123456789')
        self.testuser2 = User.objects.create_user(
            username='test_user2', password='123456789')
        test_product = Product.object.create(
            category_id=1, title='Product Title', excerpt='Product Excerpt', content='Product content', slug='product-title', author_id=1, status='published')

        client.login(username=self.testuser1.username, password='123456789')
        url = reverse(('sneakpick_api:detailcreate'), kwargs={'pk': 1})

        response = client.put(
            url, {
                "title": "New",
                "author": 1,
                "excerpt": "New",
                "content": "New",
                "status": "published",
            }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
