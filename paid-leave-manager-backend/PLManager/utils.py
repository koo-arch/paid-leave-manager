from django.http import QueryDict
from datetime import datetime

class DataFormater:
    def format_date(self, date):
        return datetime.strptime(date, '%Y-%m-%d').date()

    def format_dates(self, dates):
        return [self.format_date(date) for date in dates]


    def add_data_to_QueryDict(self, data, key, value):
        """QueryDictにデータを追加する"""
        formated_data = QueryDict.dict(data)
        formated_data[key] = value
        added_QueryDict = QueryDict('', mutable=True)
        added_QueryDict.update(formated_data)

        return added_QueryDict