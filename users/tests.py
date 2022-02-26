import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User as Usr
from .views import UserModelViewSet
from .models import User
from icecream import ic

class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'Пушкин', 'birthyear': 1799}, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/',
                               {'username': 'pushkin',
                                'email': "push@mail.ru",
                                'first_name':'Alex',
                                'last_name':'Pushkin'},
                               format='json')
        admin = Usr.objects.create_superuser('admin', 'admin@admin.com', 'admin12345')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_get_detail(self):
        user = User.objects.create(username='pushkin2',
                                     email='push@mail.ru',
                                     first_name='Alex',
                                     last_name='Pushkin')
        client = APIClient()
        response = client.get(f'/api/users/{user.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = User.objects.create(username='pushkin2',
                                   email='push@mail.ru',
                                   first_name='Alex',
                                   last_name='Pushkin')
        client = APIClient()
        response = client.put(f'/api/users/{user.uuid}/', {'username': 'lermontov', 'first_name': 'Mikhail'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_edit_admin(self):
        user = User.objects.create(username='pushkin2',
                                   email='push@mail.ru',
                                   first_name='Alex',
                                   last_name='Pushkin')
        client = APIClient()
        admin = Usr.objects.create_superuser('admin', 'admin@admin.com', 'adminGo913576411321')
        client.login(username='admin', password='adminGo913576411321')
        response = client.put(f'/api/users/{user.uuid}/',
                              {'username': 'lermontov',
                               'first_name': 'Mikhail',
                               'last_name': 'Pushkin',
                                'email':'push@mail.ru',
                               })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(uuid=user.uuid)
        self.assertEqual(user.username, 'lermontov')
        self.assertEqual(user.first_name, 'Mikhail')
        client.logout()

    class TestUserViewSet(APITestCase):

        def test_get_list(self):
            response = self.client.get('/api/users/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        def test_edit_admin(self):
            user = User.objects.create(username='pushkin2',
                                       email='push@mail.ru',
                                       first_name='Alex',
                                       last_name='Pushkin')
            admin0 = Usr.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
            self.client.login(username='admin', password='admin123456')
            response = self.client.put(f'/api/users/{user.uuid}/',
                              {'username': 'lermontov',
                               'first_name': 'Mikhail',
                               'last_name': 'Pushkin',
                                'email':'push@mail.ru',
                               })
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            user = User.objects.get(uuid=user.uuid)
            self.assertEqual(user.username,'lermontov')