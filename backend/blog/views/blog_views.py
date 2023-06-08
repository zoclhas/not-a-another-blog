from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from blog.models import *
from blog.serializers import *

from rest_framework import status


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


@api_view(["GET"])
def get_post(request, pk):
    if (
        request.user is not None
        and not request.user.is_anonymous
        # and BlogPost.objects.filter(user=request.user)
    ):
        post = BlogPost.objects.filter(id=pk)
        serializer = BlogPostSerializer(post, many=False)
        return Response(serializer.data)

    try:
        post = BlogPost.objects.get(id=pk).filter(draft=False)
        serializer = BlogPostSerializer(post, many=False)
        return Response(serializer.data)
    except:
        content = {"detail": "Blog doesn't exist or is draft."}
        return Response(content, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_post(requset):
    user = request.user
    post = BlogPost.objects.create(
        user=user, title="A title...", draft=True, content="Write out the stuff..."
    )

    serializer = BlogPostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_post(request, pk):
    user = request.user
    post = BlogPost.objects.filter(user=user).get(id=pk)
    post.delete()
    return Response({"detail": "Post has been successfully deleted."})

#@api_view(["PUT"]):
#@permission_classes([IsAuthenticated])

