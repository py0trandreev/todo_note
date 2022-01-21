from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserCustomViewSet(mixins.ListModelMixin,
                        mixins.RetrieveModelMixin, 
                        mixins.UpdateModelMixin,
                        GenericViewSet):
   queryset = User.objects.all()
   serializer_class = UserModelSerializer
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]