from django.contrib import admin
from foodoptions.models import FoodOption, CurrentFoodChoice, PreviousFoodDecision

# Register your models here.
admin.site.register(FoodOption)
admin.site.register(CurrentFoodChoice)
admin.site.register(PreviousFoodDecision)