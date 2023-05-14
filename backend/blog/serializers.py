from rest_framework import serializers
from .models import *


class BlogImageLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogImageLink
        fields = "__all__"


class BlogPostViewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPostViews
        fields = "__all__"


class BlogPostSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField(read_only=True)
    view_count = BlogPostViewsSerializer(source="views", read_only=True)

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
