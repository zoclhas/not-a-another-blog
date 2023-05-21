from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Sum

from django.contrib.auth.models import User
from blog.models import *
from blog.serializers import *

from rest_framework import status


@api_view(["GET"])
def get_user_detail(request, username):
    try:
        sort = request.query_params.get("sort", "latest")
        user = User.objects.get(username=username)
        blogs = BlogPost.objects.filter(user=user, draft=False)
        blog_length = len(blogs)

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

        query = request.query_params.get("q")
        if query is not None:
            blogs = blogs.filter(title__icontains=query) | blogs.filter(
                content__icontains=query
            )

        paginator = Paginator(blogs, 6)
        page = request.query_params.get("page", 1)
        blogs = paginator.get_page(page)

        views_sum = BlogPostViews.objects.filter(
            post__in=BlogPost.objects.filter(user=user)
        ).aggregate(Sum("views"))["views__sum"]
        serializer = BlogPostSerializer(blogs, many=True)
        data = {
            "username": user.username,
            "created_at": str(user.date_joined)[:10],
            "blog_count": blog_length,
            "blogs": serializer.data,
            "total_views": views_sum if views_sum is not None else 0,
            "page": blogs.number,
            "pages": paginator.num_pages,
        }

        return Response(data)
    except User.DoesNotExist:
        return Response(
            {"detail": "User does not exist."}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
