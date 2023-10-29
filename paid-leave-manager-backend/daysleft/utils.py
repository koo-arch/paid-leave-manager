from datetime import datetime
from PLManager.utils import DataFormater


class DaysLeftManager:
    def culc_deadline(self, effective_date):
        """有給休暇の期限を計算する"""
        # 有給休暇の期限は、翌年の3月末日とする
        if type(effective_date) == str:
            effective_date = DataFormater().format_date(effective_date)
        deadline = datetime(effective_date.year + 2, effective_date.month, effective_date.day).date()
        return deadline
    

    def dec_left_days(self, leave_date, queryset):
        """有給休暇の残日数を計算する"""
        leave_days_data = list(queryset.values('effective_date', 'leave_days', 'left_days'))
        for i in range(len(leave_days_data)):
            dict_data = leave_days_data[i]
            if leave_date >= dict_data['effective_date'] and dict_data['left_days'] > 0:
                dict_data['left_days'] -= 1
                break
    
        return leave_days_data
    

    def inc_left_days(self, leave_date, queryset):
        """有給休暇の残日数を計算する"""
        leave_days_data = list(queryset.values('effective_date', 'leave_days', 'left_days'))
        for i in range(len(leave_days_data) - 1 , -1, -1):
            dict_data = leave_days_data[i]
            if leave_date >= dict_data['effective_date'] and dict_data['left_days'] >= 0 and dict_data['left_days'] < dict_data['leave_days']:
                dict_data['left_days'] += 1
                break

        return leave_days_data

    