from django.db import models
from django.contrib.auth import get_user_model
from schedules.models import PlaceOfWork

User = get_user_model()

class LeaveDays(models.Model):
    """有給休暇の日数"""
    user = models.ForeignKey(User, verbose_name='ユーザー', on_delete=models.CASCADE)
    place = models.ForeignKey(PlaceOfWork, verbose_name='勤務地', on_delete=models.CASCADE)
    leave_days = models.IntegerField(verbose_name='有給休暇日数')
    effective_date = models.DateField(verbose_name='適用開始日')
    deadline_year = models.IntegerField(default=1, verbose_name='期限年数')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新日時')

    def __str__(self):
        return self.leave_days
    

class DaysLeft(models.Model):
    """有給休暇の残日数"""
    user = models.ForeignKey(User, verbose_name='ユーザー', on_delete=models.CASCADE)
    leave_days = models.ForeignKey(LeaveDays, verbose_name='有給休暇日数', on_delete=models.CASCADE)
    days_left = models.IntegerField(verbose_name='残日数')

    def __str__(self):
        return self.days_left