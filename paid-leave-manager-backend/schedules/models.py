from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class PlaceOfWork(models.Model):
    """勤務地"""
    user = models.ForeignKey(User, verbose_name='ユーザー', on_delete=models.CASCADE)
    name = models.CharField(verbose_name='勤務地名', max_length=255)

    def __str__(self):
        return self.name


class PaidLeaveSchedules(models.Model):
    """有給休暇のスケジュール"""
    user = models.ForeignKey(User, verbose_name='ユーザー', on_delete=models.CASCADE)
    place = models.ForeignKey(PlaceOfWork, verbose_name='勤務地', on_delete=models.CASCADE)
    leave_date = models.DateField(verbose_name='休暇日')

    def __str__(self):
        return f'{self.user} {self.place} {self.leave_date}'
