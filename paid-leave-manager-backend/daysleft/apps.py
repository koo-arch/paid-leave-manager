from django.apps import AppConfig


class DaysleftConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "daysleft"

    def ready(self):
        import daysleft.signals
