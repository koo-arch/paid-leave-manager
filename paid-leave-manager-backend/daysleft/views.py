from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import LeaveDays, DaysLeft
from schedules.models import PlaceOfWork
from .serializers import LeaveDaysSerializer, DaysLeftSerializer


class LeaveDaysListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = LeaveDays.objects.all()
    serializer_class = LeaveDaysSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        # PlaceOfWorkのnameを取得
        place_name = request.data.get('place_name')

        # 新しいPlaceOfWorkオブジェクトを作成
        place = PlaceOfWork.objects.create(name=place_name, user=request.user)

        # PlaceOfWorkオブジェクトが作成されたら、PaidLeaveSchedulesオブジェクトも作成
        if place:
            request.data['place'] = place.id
            return super().create(request, *args, **kwargs)
        else:
            return Response({'message': 'PlaceOfWork creation failed.'}, status=status.HTTP_400_BAD_REQUEST)
    

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