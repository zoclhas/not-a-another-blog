from django.contrib.auth.models import User
from rest_framework import serializers, generics
from rest_framework.response import Response
from rest_framework import status

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username",)


class BlogImageLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogImageLink
        fields = "__all__"


class BlogTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPostTag
        fields = "__all__"


class BlogPostViewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPostViews
        fields = "__all__"


class BlogPostSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField(read_only=True)
    view_count = serializers.SerializerMethodField(read_only=True)
    tags = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = BlogPost
        fields = "__all__"

    def get_images(self, obj):
        try:
            items = obj.images.all()
            image_urls = [item.image.url for item in items]
            return image_urls
        except Exception as e:
            return e

    def get_view_count(self, obj):
        try:
            post_views = obj.views.first()
            if post_views:
                count = post_views.views
            else:
                count = 0
            return count
        except Exception as e:
            return e

    def get_tags(self, obj):
        try:
            items = obj.tags.all()
            tags = [item.tag for item in items]
            return tags
        except Exception as e:
            return e

    def get_username(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data["username"]
