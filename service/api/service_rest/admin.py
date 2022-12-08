from django.contrib import admin
from .models import Appointment, Technician, AutomobileVO

admin.site.register(Appointment)
admin.site.register(Technician)
admin.site.register(AutomobileVO)
