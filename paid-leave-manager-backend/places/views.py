from rest_framework import generics, permissions
from .models import PlaceOfWork
from .serializers import PlaceOfWorkSerializer


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