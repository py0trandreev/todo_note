from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from .models import User


class UserHLModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        exclude = ("birthyear",)

class UserMinHLModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        fields = ("username", "email",)


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ("birthyear",)

class UserModelSerializer2_0(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # exclude = ("birthyear",)