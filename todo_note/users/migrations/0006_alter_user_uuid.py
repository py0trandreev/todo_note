# Generated by Django 4.0 on 2022-01-29 10:16

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_user_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('556c6b68-813e-4fe9-9629-7d22d51d91ac'), primary_key=True, serialize=False, unique=True),
        ),
    ]