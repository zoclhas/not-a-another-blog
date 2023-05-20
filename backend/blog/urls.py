from django.urls import path

from .views import blog_views as bv

urlpatterns = [
    path("blogs/", bv.get_blog_posts, name="get-blog-posts"),
    path("my-blogs/", bv.get_my_posts, name="get-my-blogs"),
    path("blog/<int:pk>/", bv.get_post, name="get-post"),
    path(
        "update-blog-views/<int:pk>/", bv.add_post_view_count, name="update-blog-views"
    ),
    path("u/<str:username>/", bv.get_user_detail, name="get-user-profile"),
]
