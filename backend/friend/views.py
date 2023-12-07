from django.contrib.auth import get_user_model
from friend.models import FriendRequest, FriendList
from rest_framework import permissions, viewsets
from .serializers import UserSerializer

# Create your views here.
class CreateUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = get_user_model().objects.none()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class FriendListViewSet(viewsets.ModelViewSet):
    """
    Dummy just to confirm that authentication is working.
    """
    queryset = get_user_model().objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    