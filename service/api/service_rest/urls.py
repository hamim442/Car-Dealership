from django.urls import path
from .views import technicianList, technician_detail, appointment_list

urlpatterns = [
    path('technicians/', technicianList, name='technicianList'),
    path('technicians/<int:id>/', technician_detail, name='technician_detail'),
    path("appointment/", appointment_list, name="appointment_list"),
]
