from django.urls import path
from .views import technicianList, technician_detail, appointment_list, appointment_detail, finish_appointment, cancel_appointment

urlpatterns = [
    path('technicians/', technicianList, name='technicianList'),
    path('technicians/<int:id>/', technician_detail, name='technician_detail'),
    path("appointment/", appointment_list, name="appointment_list"),
    path("appointment/<int:id>/", appointment_detail, name="appointment_detail"),
    path("appointment/<int:id>/cancel/", cancel_appointment, name="cancel_appointment"),
    path("appointment/<int:id>/finish/", finish_appointment, name="finish_appointment"),
]
