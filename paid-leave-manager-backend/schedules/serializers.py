from rest_framework import serializers
from .models import PlaceOfWork, PaidLeaveSchedules


class PlaceOfWorkSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = PlaceOfWork
        fields = (
            "id",
            "user",
            "name",
        )

    def validate(self, attrs):
        # 同じユーザーが同じ勤務地を登録できないようにする
        if PlaceOfWork.objects.filter(user=attrs['user'], name=attrs['name']).exists():
            raise serializers.ValidationError({"name": '同じ勤務地を登録することはできません'})
        return attrs


class PaidLeaveSchedulesSerializer(serializers.ModelSerializer):
    place = serializers.PrimaryKeyRelatedField(queryset=PlaceOfWork.objects.all())
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = PaidLeaveSchedules
        fields = (
            "id",
            "user",
            "start_date",
            "end_date",
        )
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['place'] = PlaceOfWorkSerializer(instance.place).data
        return representation
