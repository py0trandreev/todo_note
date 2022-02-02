from django.shortcuts import render
from rest_framework import mixins, permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer

# Create your views here.
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .models import User
from .serializers import UserModelSerializer, UserMinModelSerializer


class UserModelViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


class UserMinModelViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserMinModelSerializer
