from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from blog.models import *
from blog.serializers import *


@api_view(["GET"])
def get_blog_posts(request):
    posts = BlogPost.objects.all().order_by("-id")
    serializer = BlogPostSerializer(posts, many=True)
    return Response(serializer.data)
