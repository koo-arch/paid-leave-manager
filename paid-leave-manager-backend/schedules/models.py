from django.db import models
from django.contrib.auth import get_user_model
from places.models import PlaceOfWork
from daysleft.models import LeaveDays

User = get_user_model()

class PaidLeaveSchedules(models.Model):
    """有給休暇のスケジュール"""
    user = models.ForeignKey(User, verbose_name='ユーザー', on_delete=models.CASCADE)
    place = models.ForeignKey(PlaceOfWork, verbose_name='勤務地', on_delete=models.CASCADE)
    left_days_info = models.ForeignKey(LeaveDays, verbose_name='有給休暇の日数', on_delete=models.CASCADE)
    leave_date = models.DateField(verbose_name='休暇日')

    def __str__(self):
        return f'{self.user} {self.place} {self.leave_date}'
