from django.contrib.auth import get_user_model
from rest_framework import generics, views, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.decorators import action
from foodoptions.serializers import DishSerializer
from foodoptions.models import FoodOption, CurrentFoodChoice

# Create your views here.
"""
There should be endpoint for the following:

- User should be able to make a decision on a particular FoodOption,
that is, like or dislike, considering the particular user-friend
pairing; requires a CurrentFoodChoice serializer
"""
  
class OptionsView(generics.ListAPIView):
    """
    User should be able to see a list of the FoodOptions that he
    has not already made a decision on (not in CurrentFoodChoice for
    that particular user-friend pairing)
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DishSerializer
    
    def get_queryset(self):
        chooser = self.request.user
        friend = get_user_model().objects.get(username=self.kwargs["friend"])

        return FoodOption.objects.exclude(currentfoodchoice__chooser=chooser,
                                           currentfoodchoice__friend=friend).order_by('?')
    
class MakeChoiceView(views.APIView):
    """
    User should be able to make a decision on a particular FoodOption,
    that is, like or dislike, considering the particular user-friend
    pairing; requires a CurrentFoodChoice serializer
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, **kwargs):
        chooser = self.request.user
        friend = get_user_model().objects.get(username=self.kwargs["friend"])
        dish = FoodOption.objects.get(dish=request.data["dish"])
        like = True if request.data["action"] == "like" else False

        queryset = CurrentFoodChoice.objects.update_or_create(chooser=chooser,
                                                              friend=friend,
                                                              dish=dish,
                                                              liked=like)

        response = {"message":
                    f"Preference updated for dish {dish}"}

        return Response(response, status=status.HTTP_200_OK)

class ResetChoicesView(views.APIView):
    """
    User should be able to reset their choices for a particular friend
    pairing
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, **kwargs):
        chooser = self.request.user
        friend = get_user_model().objects.get(username=self.kwargs["friend"])

        queryset = CurrentFoodChoice.objects.filter(chooser=chooser, friend=friend)
        queryset.delete()

        response = {"message":
                    f"Previous choices for friend {self.kwargs['friend']} have been reset"}

        return Response(response, status=status.HTTP_200_OK)

class MatchesView(generics.ListAPIView):
    """
    User should be able to see a list of the FoodOptions that both
    them and their friend like for a particular friend match; uses the
    FoodOption serializer
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DishSerializer
    
    def get_queryset(self):
        user = self.request.user
        friend = get_user_model().objects.get(username=self.kwargs["friend"])
        
        user_liked_choices = FoodOption.objects.filter(currentfoodchoice__chooser=user,
                                                      currentfoodchoice__friend=friend,
                                                      currentfoodchoice__liked=True)
        
        friend_liked_choices = FoodOption.objects.filter(currentfoodchoice__chooser=friend,
                                                        currentfoodchoice__friend=user,
                                                        currentfoodchoice__liked=True)
        
        matches = user_liked_choices.intersection(friend_liked_choices)

        return matches