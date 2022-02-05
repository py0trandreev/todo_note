from rest_framework.serializers import ModelSerializer

from users.serializers import UserHLModelSerializer, UserMinHLModelSerializer
from .models import TODO, Project


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class ProjectReadSerializer(ModelSerializer):
    users = UserMinHLModelSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


class TODOSerializer(ModelSerializer):
    class Meta:
        model = TODO
        fields = "__all__"
        # exclude = ("is_active",)
        # fields = ["id", "text", "created_at", "project_id"]

