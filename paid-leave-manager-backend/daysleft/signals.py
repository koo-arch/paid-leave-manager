from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import LeaveDays
from schedules.models import PaidLeaveSchedules
from .utils import DaysLeftManager

@receiver(post_save, sender=PaidLeaveSchedules)
def dec_days_left(sender, instance, **kwargs):
    """有給休暇の残日数を計算する"""
    # 有給休暇の日数を取得する
    leave_days_data = LeaveDays.objects.filter(user=instance.user, place=instance.place)
    dec_data = DaysLeftManager().dec_left_days(instance.leave_date, leave_days_data)

    for data in dec_data:
        leave_days_data.filter(effective_date=data['effective_date']).update(left_days=data['left_days'])


@receiver(post_delete, sender=PaidLeaveSchedules)
def inc_days_left(sender, instance, **kwargs):
    """有給休暇の残日数を計算する"""
    # 有給休暇の日数を取得する
    leave_days_data = LeaveDays.objects.filter(user=instance.user, place=instance.place)
    inc_data = DaysLeftManager().inc_left_days(instance.leave_date, leave_days_data)

    for data in inc_data:
        leave_days_data.filter(effective_date=data['effective_date']).update(left_days=data['left_days'])

    print('delete', instance)



    