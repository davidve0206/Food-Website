from django.urls import path, include
from rest_framework import routers
from foodoptions.views import (OptionsView,
                               MakeChoiceView,
                               ResetChoicesView,
                               MatchesView)

router = routers.DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path(
      "<str:friend>/options/",
      OptionsView.as_view(),
      name="get_options_list"
    ),
    path(
      "<str:friend>/make_choice/",
      MakeChoiceView.as_view(),
      name="make_food_choice"
    ),
    path(
      "<str:friend>/reset_choices/",
      ResetChoicesView.as_view(),
      name="reset_food_choices"
    ),
    path(
      "<str:friend>/matches/",
      MatchesView.as_view(),
      name="get_matches_list"
    ),
]