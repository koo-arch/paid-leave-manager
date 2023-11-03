from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class PlaceOfWork(models.Model):
    """勤務地"""
    user = models.ForeignKey(User, verbose_name='ユーザー', on_delete=models.CASCADE)
    name = models.CharField(verbose_name='勤務地名', max_length=255)

    def __str__(self):
        return self.name