from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from blog.models import *
from blog.serializers import *

from rest_framework import status
from datetime import datetime, timedelta, date

@api_view(["GET"])
def get_blog_posts(request):
    latest_posts = BlogPost.objects.filter(draft=False).order_by("-id")[:7]
    latest_serializer = BlogPostSerializer(latest_posts, many=True)

    past_week = datetime.now() - timedelta(days=7)
    trending_posts = BlogPost.objects.filter(
        draft=False, published__gte=past_week
    ).order_by("-views__views")[:7]
    trending_serializer = BlogPostSerializer(trending_posts, many=True)

    return Response(
        {
            "latest_posts": latest_serializer.data,
            "trending_posts": trending_serializer.data,
        }
    )

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
def add_post_view_count(request, pk):
    post = BlogPost.objects.get(id=pk)

    if post.draft:
        content = {"detail": "Blog doesn't exist or is draft."}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    view_count = BlogPostViews.objects.get(post=post)
    view_count.views += 1
    view_count.save()

    return Response({"detail": "Updated view count."}, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_random_post(request):
    post = BlogPost.objects.filter(draft=False).order_by("?")[0]
    serializer = BlogPostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(["GET"])
def query_posts(request):
    blogs = BlogPost.objects.filter(draft=False)

    query = request.query_params.get("q")
    tag = request.query_params.get("tag")
    sort = request.query_params.get("sort")
    t = request.query_params.get("t")
    page = request.query_params.get("page")

    if query:
        blogs = blogs.filter(title__icontains=query) | blogs.filter(
            content__icontains=query
        )

    if tag:
        blogs = blogs.filter(tags__tag__icontains=tag)

    if sort == "latest":
        blogs = blogs.order_by("-id")
    elif sort == "oldest":
        blogs = blogs.order_by("id")
    elif sort == "views-asd":
        blogs = blogs.order_by("views__views")
    elif sort == "views-dsd":
        blogs = blogs.order_by("-views__views")
    else:
        blogs = blogs.order_by("-id")

    if t == "today":
        blogs = blogs.filter(published=date.today())
    elif t == "past_week":
        week_ago = date.today() - timedelta(days=7)
        blogs = blogs.filter(published__gte=week_ago)
    elif t == "past_month":
        month_ago = date.today() - timedelta(days=30)
        blogs = blogs.filter(published__gte=month_ago)
    elif t == "past_year":
        year_ago = date.today() - timedelta(days=365)
        blogs = blogs.filter(published__gte=year_ago)
    else:
        blogs = blogs

    page = request.query_params.get("page")
    paginator = Paginator(blogs, 9)

    try:
        blogs = paginator.page(page)
    except PageNotAnInteger:
        blogs = paginator.page(1)
    except EmptyPage:
        blogs = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = BlogPostSerializer(blogs, many=True)
    return Response(
        {"blogs": serializer.data, "page": page, "pages": paginator.num_pages}
    )


@api_view(["GET"])
def get_all_tags(request):
    tags = BlogPostTag.objects.values_list("tag", flat=True).distinct().order_by("tag")
    return Response(tags)

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

