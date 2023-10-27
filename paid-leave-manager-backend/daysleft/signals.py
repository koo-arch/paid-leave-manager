from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import LeaveDays, DaysLeft
from schedules.models import PaidLeaveSchedules


@receiver(post_save, sender=PaidLeaveSchedules)
def culc_days_left(sender, instance, **kwargs):
    """有給休暇の残日数を計算する"""
    # 有給休暇の日数を取得する
    schedules = PaidLeaveSchedules.objects.filter(user=instance.user, place=instance.place)
    leave_days = LeaveDays.objects.filter(user=instance.user, place=instance.place)

    