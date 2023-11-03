from rest_framework import generics, permissions
from .models import PaidLeaveSchedules
from .serializers import PaidLeaveSchedulesSerializer
from rest_framework.response import Response
from rest_framework import status
from PLManager.utils import DataFormater


class PaidLeaveSchedulesView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PaidLeaveSchedulesSerializer

    def get_queryset(self):
        return PaidLeaveSchedules.objects.filter(user=self.request.user)
    
    def post(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        place = data.get('place', None)
        leave_dates = data.get('leave_dates', [])
        data_formater = DataFormater()
        leave_dates = data_formater.format_dates(leave_dates)
        leave_dates.sort()

        transform_data = []
        for leave_date in leave_dates:
            transform_data.append({
                'user': user.id,
                'place': place,
                'left_days_info': None, # 仮の値
                'leave_date': leave_date
            })
        
        exsit_data = PaidLeaveSchedules.objects.filter(user=user, place=place)

        # 既存データの日付をリストに追加
        exsit_dates = [data.leave_date for data in exsit_data]
        
        # DBに存在しない日付のみを抽出
        transform_data = [
            data for data in transform_data if data['leave_date'] not in exsit_dates
        ]
        serializer = self.get_serializer(data=transform_data, many=True)

        if serializer.is_valid():
            # DBのみに存在する日付を削除
            for data in exsit_data:
                if data.leave_date not in leave_dates:
                    data.delete()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PaidLeaveSchedulesDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PaidLeaveSchedulesSerializer

    def get_queryset(self):
        return PaidLeaveSchedules.objects.filter(user=self.request.user)
    