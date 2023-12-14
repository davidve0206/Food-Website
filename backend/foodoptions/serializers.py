from rest_framework import serializers
from django.contrib.auth import get_user_model
from foodoptions.models import FoodOption, CurrentFoodChoice

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodOption
        fields = "__all__"