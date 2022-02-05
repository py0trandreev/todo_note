from uuid import uuid4

from django.db import models


# Create your models here.
class User(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4())
    username = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(unique=True, blank=False)
    birthyear = models.PositiveIntegerField(default=0)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.username
