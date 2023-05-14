from django.urls import path

from .views import blog_views as bv

urlpatterns = [
    path("blogs/", bv.get_blog_posts, name="get-blog-posts"),
    path("blog-views/", bv.get_blog_post_views, name="get-blog-views"),
]
