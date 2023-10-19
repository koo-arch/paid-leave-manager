from django.urls import path
from .views import PlaceOfWorkView, PlaceOfWorkDetailView, PaidLeaveSchedulesView, PaidLeaveSchedulesDetailView

urlpatterns = [
    path("place-of-work/", PlaceOfWorkView.as_view()),
    path("place-of-work/<int:pk>/", PlaceOfWorkDetailView.as_view()),
    path("paid-leave-schedules/", PaidLeaveSchedulesView.as_view()),
    path("paid-leave-schedules/<int:pk>/", PaidLeaveSchedulesDetailView.as_view()),
]