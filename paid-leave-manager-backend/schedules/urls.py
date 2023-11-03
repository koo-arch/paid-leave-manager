from django.urls import path
from .views import PaidLeaveSchedulesView, PaidLeaveSchedulesDetailView

urlpatterns = [
    path("paid-leave-schedules/", PaidLeaveSchedulesView.as_view()),
    path("paid-leave-schedules/<int:pk>/", PaidLeaveSchedulesDetailView.as_view()),
]