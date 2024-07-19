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
        automobile = AutomobileVO.objects.get(vin=vin) #this has to be get and not all
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
        appointments = Appointment.objects.all()
        response = []

        for appointment in appointments:
            appointment_data = AppointmentEncoder().encode(appointment)
            appointment_data = json.loads(appointment_data)
            appointment_data['is_vip'] = is_vip(appointment.vin)

            response.append(appointment_data)

        return JsonResponse({"appointments": response}, safe=False)
    
    else:
        content = json.loads(request.body)
        technician = get_object_or_404(Technician, id=content['technician'])

        appointment = Appointment.objects.create( 
            date_time=content['date_time'],
            reason = content['reason'],
            status = content['status'],
            vin = content['vin'],
            technician=technician
        )

        #Need to encode the newly created appointment date
        appointment_data = AppointmentEncoder().encode(appointment)
        appointment_data = json.loads(appointment_data)

        appointment_data['is_vip'] = is_vip(appointment.vin)

        return JsonResponse(appointment_data, safe=False, status=201)
    
    
@require_http_methods(["GET", "PUT", "DELETE"])
def appointment_detail(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment doesn't exist"}, status=404)
    
    if request.method == "GET":
        appointment_data = AppointmentEncoder().encode(appointment)
        appointment_data = json.loads(appointment_data)
        appointment_data['is_vip'] = is_vip(appointment.vin)
        return JsonResponse( 
            appointment_data,
            safe=False
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        for key, value in content.items():
            setattr(appointment, key, value)
        appointment.save()

        appointment_data = AppointmentEncoder().encode(appointment)
        appointment_data = json.loads(appointment_data)
        appointment_data['is_vip'] = is_vip(appointment.vin)
       
        return JsonResponse( 
            appointment_data,
            safe=False
        )
    
    elif request.method == "DELETE":
        appointment.delete()
        return JsonResponse({"message": "Appointment Deleted"}, status=204)
    
@require_http_methods(["PUT"])
def cancel_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id) #Get appointment by ID
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment doesn't exist"}, status=404)
    
    appointment.status = "canceled"
    appointment.save()
    appointment_data = AppointmentEncoder().encode(appointment) #this line convert object into
                                                                # json format
    appointment_data = json.loads(appointment_data)
    appointment_data['is_vip'] = is_vip(appointment.vin)
    return JsonResponse(appointment_data, safe=False)


@require_http_methods(["PUT"])
def finish_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id) #Get appointment by ID
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment doesn't exist"}, status=404)
    
    appointment.status = "finished"
    appointment.save()
    appointment_data = AppointmentEncoder().encode(appointment) #this line convert object into
                                                                # json format
    appointment_data = json.loads(appointment_data)
    appointment_data['is_vip'] = is_vip(appointment.vin)
    return JsonResponse(appointment_data, safe=False)



