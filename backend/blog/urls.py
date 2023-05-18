from django.urls import path

from .views import blog_views as bv

urlpatterns = [
    path("blogs/", bv.get_blog_posts, name="get-blog-posts"),
    path("my-blogs/", bv.get_my_posts, name="get-my-blogs"),
    path("blog/<int:pk>/", bv.get_post, name="get-post"),
]
