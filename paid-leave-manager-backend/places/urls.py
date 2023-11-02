from django.urls import path
from .views import PlaceOfWorkView, PlaceOfWorkDetailView

urlpatterns = [
    path("place-of-work/", PlaceOfWorkView.as_view()),
    path("place-of-work/<int:pk>/", PlaceOfWorkDetailView.as_view()),
]