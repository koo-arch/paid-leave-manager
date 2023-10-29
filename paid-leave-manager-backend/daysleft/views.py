from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import LeaveDays, DaysLeft
from schedules.models import PlaceOfWork
from .serializers import LeaveDaysSerializer, DaysLeftSerializer
from datetime import datetime
from PLManager.utils import DataFormater


class LeaveDaysListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = LeaveDays.objects.all()
    serializer_class = LeaveDaysSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    
class LeaveDaysDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = LeaveDays.objects.all()
    serializer_class = LeaveDaysSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    

class DaysLeftListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = DaysLeft.objects.all()
    serializer_class = DaysLeftSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)