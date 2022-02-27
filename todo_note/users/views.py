from django.shortcuts import render
from rest_framework import mixins, permissions, generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer

# Create your views here.
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .models import User
from .serializers import UserHLModelSerializer, UserMinModelSerializer, UserModelSerializer, UserModelSerializer2_0


class UserModelViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserHLModelSerializer


class UserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


class UserMinModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserMinModelSerializer


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        #ic(self.request.version)
        if self.request.version == '2.0':
            return UserModelSerializer2_0

        return UserModelSerializer