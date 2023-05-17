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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_posts(request):
    posts = (
        BlogPost.objects.filter(user=request.user).filter(draft=False).order_by("-id")
    )
    drafts = (
        BlogPost.objects.filter(user=request.user).filter(draft=True).order_by("-id")
    )

    page = request.query_params.get("page")
    paginator = Paginator(posts, 6)

    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = BlogPostSerializer(posts, many=True)
    draft_serializer = BlogPostSerializer(drafts, many=True)
    return Response(
        {
            "blogs": serializer.data,
            "drafts": draft_serializer.data,
            "total_blogs": len(posts),
            "total_drafts": len(drafts),
            "page": page,
            "pages": paginator.num_pages,
        }
    )
