from django.contrib.auth import get_user_model
from friend.models import FriendRequest, FriendList
from rest_framework import viewsets, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import UserSerializer, FriendRequestSerializer, FriendListSerializer

# Create your views here.
class CreateUserViewSet(viewsets.ModelViewSet):
    """
    Endpoint that allows user creation. As it is an open to anyone, returns empty queryset.
    """
    queryset = get_user_model().objects.none()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class UserListViewSet(viewsets.ModelViewSet):
    """
    Create an endpoint that exposes all users, to create the user search functionallity.
    """
    queryset = get_user_model().objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

class FriendRequestViewSet(viewsets.ModelViewSet):
    """
    Endpoint that exposes the Friend Request serializer
    A user should only have the option to see the requests sent to them, not to other users.
    The user has the option of accepting or declining the request, which is handled by the model.
    Returns a generic error message if the users or action sent by the user are incorrect.
    """
    serializer_class = FriendRequestSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the friend requests the currently
        authenticated user has received.
        """
        user = self.request.user
        return FriendRequest.objects.filter(receiver=user).order_by("-timestamp")
    
    @action(detail=True, methods=["POST"])
    def resolve(self, request, pk=None):
        try:
          # Sender and receiver are set in the body of the request by the frontent
          sender = get_user_model().objects.get(username=request.data["sender"])
          receiver = get_user_model().objects.get(username=request.data["receiver"])
          
          match request.data["action"]:
              case "accept":
                  FriendRequest.objects.get(sender=sender, receiver=receiver).accept()
                  response = {"message": "Friend request accepted"}
                  return Response(response, status=status.HTTP_200_OK)
              case "decline":
                  FriendRequest.objects.get(sender=sender, receiver=receiver).decline()
                  response = {"message": "Friend request declined"}
                  return Response(response, status=status.HTTP_200_OK)
              case _:
                  response = {"message": "An error has ocurred"}
                  return Response(response, status=status.HTTP_400_BAD_REQUEST)
        except:
            # Return an error message if one of the users does not exist
            response = {"message": "An error has ocurred"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
class FriendListViewSet(viewsets.ModelViewSet):
    """
    Endpoint that allows a user to see a list of his friends, and be able to unfriend people.
    """
    serializer_class = UserSerializer
    lookup_field = "username"
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        The user should only be able to see its own friend lists
        """
        user = self.request.user
        return get_user_model().objects.filter(friend_list__user = user)
    
    @action(detail=True, methods=["POST"])
    def unfriend(self, request, username):
        try:
          # Set the user and the person to be unfriended from the request
          user = request.user
          to_unfriend = get_user_model().objects.get(username=username)
          
          FriendList.objects.get(user = user).unfriend(to_unfriend)
          response = {"message": "Friend removed"}
          return Response(response, status=status.HTTP_200_OK)
        
        except:
            # Return an error message if one of the users does not exist
            response = {"message": "An error has ocurred"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)