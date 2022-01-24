from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from todoapp.models import TODO, Project
from todoapp.serializers import ProjectSerializer, TODOSerializer


class ProjectSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    # max_page_size = 10000


# Create your views here.
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectSetPagination

    def get_queryset(self):
        name = self.request.query_params.get("name", "")
        projects = Project.objects.all()
        if name:
            projects = projects.filter(name__contains=name)
        return projects


class TODOSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    # max_page_size = 10000


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOSerializer
    pagination_class = TODOSetPagination

    def destroy(self, request, *args, **kwargs):
        TODOel = self.get_object()
        TODOel.is_active = False
        TODOel.save()
        return Response(data="delete success")

    def get_queryset(self):
        projid = self.request.query_params.get("pid", "")
        TODOs = TODO.objects.all()
        if projid:
            TODOs = TODOs.filter(project_id=projid)
        return TODOs
