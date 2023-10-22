from rest_framework import serializers
from .models import LeaveDays, DaysLeft
from schedules.models import PlaceOfWork
from schedules.serializers import PlaceOfWorkSerializer


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
    

class DaysLeftSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    leave_days = serializers.PrimaryKeyRelatedField(queryset=LeaveDays.objects.all())
    class Meta:
        model = DaysLeft
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['leave_days'] = DaysLeftSerializer(instance.leave_days).data
        return representation