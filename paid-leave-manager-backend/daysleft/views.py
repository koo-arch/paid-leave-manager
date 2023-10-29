from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import LeaveDays
from .serializers import LeaveDaysSerializer
from PLManager.utils import DataFormater
from .utils import DaysLeftManager


class LeaveDaysListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = LeaveDays.objects.all()
    serializer_class = LeaveDaysSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    def post(self, request, *args, **kwargs):
        data = request.data
        effective_date = data.get('effective_date', None)
        leave_days = data.get('leave_days', None)

        # 有給休暇の期限を計算
        deadline = DaysLeftManager().culc_deadline(effective_date)

        # QueryDictにデータを追加
        data_formater = DataFormater()
        added_data = data_formater.add_data_to_QueryDict(data, "deadline", deadline)
        added_data = data_formater.add_data_to_QueryDict(added_data, "left_days", leave_days)

        # シリアライザーにデータを渡す
        serializer = self.get_serializer(data=added_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
class LeaveDaysDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = LeaveDays.objects.all()
    serializer_class = LeaveDaysSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
