from rest_framework import serializers
from .models import LeaveDays, DaysLeft
from schedules.models import PlaceOfWork
from schedules.serializers import PlaceOfWorkSerializer
from .utils import DaysLeftManager
from datetime import datetime


class LeaveDaysSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    place = serializers.PrimaryKeyRelatedField(queryset=PlaceOfWork.objects.all())
    class Meta:
        model = LeaveDays
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['place'] = PlaceOfWorkSerializer(instance.place).data
        return representation

    def validate(self, attrs):
        deadline = DaysLeftManager().culc_deadline(attrs['effective_date'])
        today = datetime.now().date()

        if deadline < today:
            raise serializers.ValidationError({"detail": "有給休暇の期限を過ぎています。"})
        
        if LeaveDays.objects.filter(user=attrs['user'], place=attrs['place'], effective_date=attrs["effective_date"]).exists():
            raise serializers.ValidationError({"detail": "既に登録されています。"})
        return attrs
    

class DaysLeftSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    leave_days_info = serializers.PrimaryKeyRelatedField(queryset=LeaveDays.objects.all())
    class Meta:
        model = DaysLeft
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['leave_days_info'] = DaysLeftSerializer(instance.leave_days_info).data
        return representation