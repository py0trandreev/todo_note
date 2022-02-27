from django.db import models

from users.models import User


# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=64)
    repository = models.URLField(blank=True)
    users = models.ManyToManyField(User)

    def __str__(self) -> str:
        return self.name


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
