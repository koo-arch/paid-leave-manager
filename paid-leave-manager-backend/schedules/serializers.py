from rest_framework import serializers
from .models import PlaceOfWork, PaidLeaveSchedules
from places.serializers import PlaceOfWorkSerializer
from daysleft.models import LeaveDays
from daysleft.serializers import LeaveDaysSerializer


class PaidLeaveSchedulesSerializer(serializers.ModelSerializer):
    place = serializers.PrimaryKeyRelatedField(queryset=PlaceOfWork.objects.all())
    left_days_info = serializers.PrimaryKeyRelatedField(queryset=LeaveDays.objects.all())
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = PaidLeaveSchedules
        fields = "__all__"
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['place'] = PlaceOfWorkSerializer(instance.place).data
        representation['left_days_info'] = LeaveDaysSerializer(instance.left_days_info).data
        return representation
    
    def validate(self, attrs):
        # 同じユーザーが同じ日付を登録できないようにする
        if PaidLeaveSchedules.objects.filter(user=attrs['user'], place=attrs['place'], leave_date=attrs['leave_date']).exists():
            raise serializers.ValidationError({"leave_date": '同じ日付を登録することはできません'})
        return attrs
