from django.urls import path, include
from rest_framework import routers
from .views import CreateUserViewSet, FriendListViewSet

router = routers.DefaultRouter()
router.register("new", CreateUserViewSet)
router.register("", FriendListViewSet)

urlpatterns = [
    path("", include(router.urls))
]