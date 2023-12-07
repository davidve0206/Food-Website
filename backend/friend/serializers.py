from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from friend.models import FriendRequest, FriendList

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["url", "username", "email", "first_name", "last_name", "password"]
        extra_kwargs = {"password":
                            {"write_only": True, "required": False}
                        }
    #Override create method to use Django's create_user    
    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user