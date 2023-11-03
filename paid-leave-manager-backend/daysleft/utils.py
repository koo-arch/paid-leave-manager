from datetime import datetime, timedelta
from PLManager.utils import DataFormater
from schedules.models import PaidLeaveSchedules


class DaysLeftManager:
    def culc_deadline(self, effective_date):
        """有給休暇の期限を計算する"""
        if isinstance(effective_date, str):
            effective_date = DataFormater().format_date(effective_date)
        later_two_years = datetime(effective_date.year + 2, effective_date.month, effective_date.day).date()
        deadline = later_two_years - timedelta(days=1)
        return deadline
    

    def update_left_days_info(seif, dict_data):
        """有給消化日の関連付けを更新する"""
        PaidLeaveSchedules.objects.filter(
            user=dict_data['user_id'],
            place=dict_data['place_id'],
            leave_date__gte=dict_data['effective_date'],
            leave_date__lte=dict_data['deadline']
        ).update(left_days_info=dict_data['id'])
    

    def dec_left_days(self, leave_date, queryset):
        """有給休暇の残日数を減算する"""
        leave_days_data = list(queryset.values())

        for i in range(len(leave_days_data)):
            dict_data       = leave_days_data[i]
            effective_date  = dict_data['effective_date']
            deadline        = dict_data['deadline']
            left_days       = dict_data['left_days']

            if effective_date <= leave_date <= deadline and left_days > 0:
                self.update_left_days_info(dict_data) 
                dict_data['left_days'] -= 1
                break
    
        return leave_days_data
    

    def inc_left_days(self, leave_date, queryset):
        """有給休暇の残日数を増加する"""
        leave_days_data = list(queryset.values())
        
        for i in range(len(leave_days_data) - 1 , -1, -1):
            dict_data       = leave_days_data[i]
            effective_date  = dict_data['effective_date']
            deadline        = dict_data['deadline']
            left_days       = dict_data['left_days']
            leave_days      = dict_data['leave_days']

            if effective_date <= leave_date <= deadline and left_days >= 0 and left_days < leave_days:
                self.update_left_days_info(dict_data)
                dict_data['left_days'] += 1
                break

        return leave_days_data

    