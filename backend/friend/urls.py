from django.urls import path, include
from rest_framework import routers
from .views import (CreateUserViewSet,
                    UserListViewSet,
                    FriendRequestViewSet,
                    FriendListViewSet)

router = routers.DefaultRouter()
router.register("new", CreateUserViewSet)
router.register("all", UserListViewSet)
router.register("friends", FriendListViewSet, basename="friend_list")
router.register("friends/requests", FriendRequestViewSet, basename="friend_requests")

urlpatterns = [
    path("", include(router.urls))
]