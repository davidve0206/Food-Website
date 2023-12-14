from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from friend.models import FriendRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "email", "first_name", "last_name", "password"]
        lookup_field = "username"
        extra_kwargs = {"password":
                            {"write_only": True, "required": False}
                        }
    #Override create method to use Django's create_user    
    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
    
class FriendRequestSerializer(serializers.ModelSerializer):
    """
    Friend Requests should be accessed using the usernames of both parts
    """
    sender = serializers.SlugRelatedField(slug_field="username",
                                          queryset=get_user_model().objects.all())
    receiver = serializers.SlugRelatedField(slug_field="username",
                                          queryset=get_user_model().objects.all())

    class Meta:
        model = FriendRequest
        exclude = ["timestamp"]