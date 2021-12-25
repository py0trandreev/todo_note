from django.db import models
from uuid import uuid4

# Create your models here.
class User(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4())
    email = models.EmailField(unique=True, blank=False)
    birthday = models.DateField(blank=True)