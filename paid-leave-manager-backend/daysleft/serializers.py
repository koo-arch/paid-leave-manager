from rest_framework import serializers
from .models import DaysLeft

class DaysLeftSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = DaysLeft
        fields = '__all__'
        read_only_fields = ['user', 'days_left_updated']
