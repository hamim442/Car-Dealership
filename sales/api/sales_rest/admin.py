from django.contrib import admin
from .models import Salesperson, Customer, AutomobileVO, Sale
# Register your models here.


@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "employee_id"]


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "address", "phone_number"]


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display = ["vin", "sold"]


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ["automobile", "salesperson", "customer", "price"]
