from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from .models import User


class UserHLModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        exclude = ("birthyear", "is_superuser", "is_staff")

class UserMinHLModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        fields = ("username", "email",)


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ("birthyear", "is_superuser", "is_staff")

class UserModelSerializer2_0(ModelSerializer):
    class Meta:
        model = User
        exclude = ("birthyear",)