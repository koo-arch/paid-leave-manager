from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class DaysLeft(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    days_left = models.IntegerField()
    effective_date = models.DateField()
    deadline_year = models.IntegerField(default=1)
    days_left_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.days_left