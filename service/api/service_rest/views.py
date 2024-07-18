from django.shortcuts import render, get_object_or_404
from .models import Technician, AutomobileVO, Appointment
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        'first_name',
        'last_name',
        'employee_id'
    ]

class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'vin',
        'sold'
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        'date_time',
        "reason",
        "status",
        'vin',
        'technician'
    ]
    encoders = {
            "technician": TechnicianEncoder(),
    }
    
def is_vip(vin):
    try:
        automobile = AutomobileVO.objects.all(vin=vin)
        return automobile.sold
    except AutomobileVO.DoesNotExist:
        return False


# Create your views here.

@require_http_methods(["GET", "POST"])
def technicianList(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse( 
            {"technician": technician},
            encoder=TechnicianEncoder,
            safe=False
        )
    else: #post
        content = json.loads(request.body)

        employee_id = content.get('employee_id')
        if Technician.objects.filter(employee_id=employee_id).exists():
            return JsonResponse({"message": "Techncian already exist"})
        
        new_technician = Technician.objects.create( 
            first_name=content['first_name'],
            last_name=content['last_name'],
            employee_id=employee_id
        )
        return JsonResponse( 
            new_technician,
            encoder=TechnicianEncoder,
            safe=False,
            status=201
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def technician_detail(request, id):
    
    try:
       technician = Technician.objects.get(id=id)
    except Technician.DoesNotExist:
       return JsonResponse({"message": "Technician doesn't exist"}, status=404)

    if request.method == "GET":
        return JsonResponse( 
            technician,
            encoder=TechnicianEncoder, 
            safe=False
        )
    elif request.method == "PUT":
        context = json.loads(request.body)
        for key, value in context.items():
            setattr(technician, key, value)
        technician.save()
        return JsonResponse( 
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )
    elif request.method =="DELETE":
        technician.delete()
        return JsonResponse({"message": "Technician Deleted"}, status=204)
    
@require_http_methods(["GET", "POST"])
def appointment_list(request):
    if request.method == "GET":
        appointment = Appointment.objects.all()
        print("Appointments:", appointment)  
        return JsonResponse(
                            {"appointment": appointment},
                            encoder=AppointmentEncoder, 
                            safe=False)
    else: #post
        content = json.loads(request.body)
        appointment = Appointment.objects.create( 
            date_time=content['date_time'],
            reason=content['reason'],
            status = content['status'],
            vin = content['vin'],
            technician = Technician.objects.get(id=content['technician'])
        )
        return JsonResponse({"appointment": appointment}, encoder=AppointmentEncoder, safe=False)




