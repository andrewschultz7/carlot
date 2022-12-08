from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})


class Appointment(models.Model):
    name = models.CharField(max_length=200)
    date_time = models.DateTimeField()
    reason = models.TextField(max_length=200)
    vin = models.CharField(max_length=17, unique=True, null=True)
    finished = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.id})
