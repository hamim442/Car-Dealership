from django.contrib import admin
from .models import Technician, AutomobileVO, Appointment

# Register your models here.

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    list_display=['first_name', 'last_name', 'employee_id']

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display=['vin', 'sold']

@admin.register(Appointment)
class AppointmentsAdmin(admin.ModelAdmin):
    list_display=["date_time", "reason", "status", "vin", "technician"]
