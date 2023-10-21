from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import DaysLeft
from .serializers import DaysLeftSerializer


class DaysLeftListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = DaysLeft.objects.all()
    serializer_class = DaysLeftSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    

class DaysLeftDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = DaysLeft.objects.all()
    serializer_class = DaysLeftSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)