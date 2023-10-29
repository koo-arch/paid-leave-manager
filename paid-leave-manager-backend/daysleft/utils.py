from datetime import datetime
from PLManager.utils import DataFormater

class DaysLeftManager:
    def culc_deadline(self, effective_date):
        """有給休暇の期限を計算する"""
        # 有給休暇の期限は、翌年の3月末日とする
        if type(effective_date) == str:
            effective_date = DataFormater().format_date(effective_date)
        deadline = datetime(effective_date.year + 2, 3, 31).date()
        return deadline
    

    