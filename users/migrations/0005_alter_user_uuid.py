# Generated by Django 4.0 on 2022-01-21 15:52

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_user_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('16655ce1-fbd3-433a-8041-5386dd6aa214'), primary_key=True, serialize=False),
        ),
    ]
