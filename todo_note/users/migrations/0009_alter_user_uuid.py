# Generated by Django 4.0 on 2022-01-29 10:46

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_alter_user_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('b6f027a9-6bcf-42e9-a902-2b906f5ffca9'), primary_key=True, serialize=False),
        ),
    ]
