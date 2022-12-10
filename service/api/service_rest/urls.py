from django.urls import path

from .views import (
    api_technician,
    api_technicians,
    api_appointment,
    api_appointments,
    api_history,
)

urlpatterns = [
    path(
        "technicians/",
        api_technicians,
        name="api_technicians",
    ),
    path(
        "technicians/<int:id>/",
        api_technician,
        name="api_technician",
    ),
    path(
        "service/",
        api_appointments,
        name="api_appointments",
    ),
    path(
        "service/<int:pk>/",
        api_appointment,
        name="api_appointment",
    ),
    path(
        "history/",
        api_history,
        name="api_history",
    ),
]
