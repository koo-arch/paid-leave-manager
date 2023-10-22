from django.urls import path
from .views import LeaveDaysListView, LeaveDaysDetailView, DaysLeftListView

urlpatterns = [
    path("leavedays/", LeaveDaysListView.as_view()),
    path("leavedays/<int:pk>/", LeaveDaysDetailView.as_view()),
    path("daysleft/", DaysLeftListView.as_view()),
]