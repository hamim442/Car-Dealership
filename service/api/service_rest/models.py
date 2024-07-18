from django.db import models

# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=17)

    def __str__(self):
        return self.first_name + " " + self.last_name

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    STATUS_CHOICE = [
        ('created', 'Created'),
        ('canceled', 'Cancaled'),
        ('finished', 'Finished')
    ]
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=10, choices=STATUS_CHOICE, default='created')
    vin = models.CharField(max_length=200)
    technician = models.ForeignKey("Technician", related_name="Technician", on_delete=models.CASCADE)

    
