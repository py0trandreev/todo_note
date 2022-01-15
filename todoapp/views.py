from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from todoapp.models import TODO, Project
from todoapp.serializers import ProjectSerializer, TODOSerializer


# Create your views here.
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOSerializer
