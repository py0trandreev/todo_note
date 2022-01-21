from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination

from todoapp.models import TODO, Project
from todoapp.serializers import ProjectSerializer, TODOSerializer


class ProjectSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    # max_page_size = 10000


# Create your views here.
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectSetPagination


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOSerializer
