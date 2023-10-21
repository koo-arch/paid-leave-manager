from django.urls import path
from .views import DaysLeftListView, DaysLeftDetailView

urlpatterns = [
    path("daysleft/", DaysLeftListView.as_view()),
    path("daysleft/<int:pk>/", DaysLeftDetailView.as_view()),
]