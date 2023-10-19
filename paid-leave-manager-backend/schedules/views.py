from rest_framework import generics, permissions
from .models import PlaceOfWork, PaidLeaveSchedules
from .serializers import PlaceOfWorkSerializer, PaidLeaveSchedulesSerializer
from rest_framework.response import Response
from rest_framework import status


class PlaceOfWorkView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PlaceOfWorkSerializer

    def get_queryset(self):
        return PlaceOfWork.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PlaceOfWorkDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PlaceOfWorkSerializer
    queryset = PlaceOfWork.objects.all()

    def get_queryset(self):
        return PlaceOfWork.objects.filter(user=self.request.user)
    

class PaidLeaveSchedulesView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PaidLeaveSchedulesSerializer

    def get_queryset(self):
        return PaidLeaveSchedules.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PaidLeaveSchedulesDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PaidLeaveSchedulesSerializer

    def get_queryset(self):
        return PaidLeaveSchedules.objects.filter(user=self.request.user)
    