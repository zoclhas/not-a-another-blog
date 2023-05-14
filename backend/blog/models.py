from django.db import models

from django.contrib.auth.models import User
import uuid
import io
from PIL import Image
from django.core.files.base import ContentFile
from django.db.models.fields.files import ImageFieldFile
import datetime


class WEBPFieldFile(ImageFieldFile):
    def save(self, name, content, save=True):
        content.file.seek(0)
        image = Image.open(content.file)
        image_bytes = io.BytesIO()
        image.save(fp=image_bytes, format="WEBP")
        image_content_file = ContentFile(content=image_bytes.getvalue())
        super().save(name, image_content_file, save)


class WEBPField(models.ImageField):
    attr_class = WEBPFieldFile


def image_folder(instance, filename):
    return "blog-{}.webp".format(uuid.uuid4().hex)


class BlogPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=False, blank=False)
    draft = models.BooleanField(default=False)
    published = models.DateField(("Date"), default=datetime.date.today)
    cover_image = WEBPField(
        verbose_name=("cover_image"),
        upload_to=image_folder,
        null=True,
        blank=True,
    )
    content = models.TextField(blank=False, null=False)

    def __str__(self):
        return self.title


class BlogImageLink(models.Model):
    post = models.ForeignKey(
        BlogPost, on_delete=models.CASCADE, null=True, blank=True, related_name="images"
    )
    image = WEBPField(
        verbose_name=("image"),
        upload_to=image_folder,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.post.title} - {self.id}"


class BlogPostViews(models.Model):
    post = models.ForeignKey(
        BlogPost, on_delete=models.CASCADE, null=True, blank=True, related_name="views"
    )
    views = models.IntegerField(default=0)

    def __str__(self):
        return f"@{self.post.user} - {self.post.title} - {self.views} views"


from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=BlogPost)
def create_blogpost_views(sender, instance, created, **kwargs):
    if created:
        BlogPostViews.objects.create(post=instance)
        print("hi")

    print("no hi")
