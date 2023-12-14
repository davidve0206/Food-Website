from collections.abc import Iterable
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from friend.models import FriendList

class FoodOption(models.Model):
    """
    Model that contains all of the Food Options that the application
    will present users for them to like / not like
    """

    class Cuisine(models.TextChoices):
        # Define choices of potential cuisines
        AFRICAN = "African"
        AMERICAN = "American"
        MEXICAN = "Mexican"
        PERUVIAN = "Peruvian"
        CARIBEAN = "Caribean"
        OTHER_LATAM = "Other Latinoamerican"
        CHINESE = "Chinese"
        COREAN = "Corean"
        JAPANESE = "Japanese"
        THAI =  "Thai"
        OTHER_ASIAN = "Other Asian"
        ITALIAN = "Italian"
        MEDITERRANEAN = "Mediterranean"
        EAST_EUR = "Eastern European"
        OTHER_EUR = "Other European"
        OCEANIC = "Oceanic"

    dish = models.CharField(primary_key=True, max_length=20)
    cuisine = models.CharField(max_length=20, choices=Cuisine.choices)
    spicy = models.BooleanField()
    gluten_free = models.BooleanField()
    vegetarian = models.BooleanField()
    image = models.ImageField(upload_to="food")

    class Meta:
        verbose_name = _("FoodOption")
        verbose_name_plural = _("FoodOptions")

    def __str__(self):
        return self.dish

class PreviousFoodDecision(models.Model):
    """
    Model that will hold an user's historical decisions regarding
    food options, to have the posibility of providing lists of food
    options that consider the user's previous choices
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    dish = models.ForeignKey(FoodOption, on_delete=models.CASCADE)
    liked = models.BooleanField()
    timestamp = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name = _("FoodDecision")
        verbose_name_plural = _("FoodDecisions")

class CurrentFoodChoice(models.Model):
    """
    Model that holds all the user's active food choices for any friend
    pairing

    Every time a choice is made (created), it should also be recorded in
    as a PreviusFoodDecision
    """
    chooser = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    friend = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="selected_friend")
    dish  = models.ForeignKey(FoodOption, on_delete=models.CASCADE)
    liked = models.BooleanField()

    class Meta:
        verbose_name = _("CurrentChoice")
        verbose_name_plural = _("CurrentChoices")
        unique_together = ["chooser", "friend", "dish"]

    def save(self, *args, **kwargs):
        """
        Decisions should only be saved if the friend is in the chooser's friend_list
        Teh choise is also recorded in PreviousFoodChoiceDecision
        """
        if self.friend in get_user_model().objects.filter(friend_list__user = self.chooser):
          super().save(*args, **kwargs)
          PreviousFoodDecision.objects.create(user=self.chooser,
                                              dish=self.dish,
                                              liked=self.liked)