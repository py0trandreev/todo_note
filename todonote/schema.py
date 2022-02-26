import graphene
from graphene_django import DjangoObjectType
from users.models import User
from todoapp.models import Project, TODO


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(TODOType)
    users_by_username = graphene.List(UserType, name=graphene.String(required=False))

    def resolve_users_by_username(root, info, name=None):
        users = User.objects.all()
        if name:
            users = users.filter(username=name)
        return users

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_todo(root, info):
        return TODO.objects.all()




schema = graphene.Schema(query=Query)