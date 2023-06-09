# Generated by Django 4.2.1 on 2023-05-14 11:52

import blog.models
import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="BlogPost",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("draft", models.BooleanField(default=False)),
                (
                    "published",
                    models.DateField(default=datetime.date.today, verbose_name="Date"),
                ),
                (
                    "cover_image",
                    blog.models.WEBPField(
                        blank=True,
                        null=True,
                        upload_to=blog.models.image_folder,
                        verbose_name="cover_image",
                    ),
                ),
                ("content", models.TextField()),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="BlogPostViews",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("views", models.IntegerField(default=0, editable=False)),
                (
                    "post",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="views",
                        to="blog.blogpost",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="BlogImageLink",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "image",
                    blog.models.WEBPField(
                        blank=True,
                        null=True,
                        upload_to=blog.models.image_folder,
                        verbose_name="image",
                    ),
                ),
                (
                    "post",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="blog.blogpost",
                    ),
                ),
            ],
        ),
    ]
