# Generated by Django 4.0 on 2022-01-15 14:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("users", "0003_alter_user_uuid"),
    ]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=64)),
                ("repository", models.URLField(blank=True)),
                ("users", models.ManyToManyField(to="users.User")),
            ],
        ),
        migrations.CreateModel(
            name="TODO",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("text", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("is_active", models.BooleanField(default=True)),
                ("project", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="todoapp.project")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="users.user")),
            ],
        ),
    ]
