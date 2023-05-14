"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from dj_rest_auth.registration.views import VerifyEmailView, ResendEmailVerificationView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/register/", include("dj_rest_auth.registration.urls")),
    path(
        "dj-rest-auth/account-confirm-email/",
        VerifyEmailView.as_view(),
        name="account_email_verification_sent",
    ),
    path(
        "dj-rest-auth/account-resend-confirm-email/",
        ResendEmailVerificationView.as_view(),
        name="account_email_verification_sent",
    ),
    path("api/", include("blog.urls")),
]
