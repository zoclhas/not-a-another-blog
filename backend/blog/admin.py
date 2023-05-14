from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(BlogPost)
admin.site.register(BlogImageLink)
admin.site.register(BlogPostViews)
