from django.shortcuts import render, get_object_or_404, redirect
from .models import Salesperson, Customer, AutomobileVO, Sale
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json
from decimal import Decimal


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
        ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number"
        ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
        ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }

    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)   #insures that any decimal oject converts into float


@require_http_methods(["GET", "POST"])
def salespeople_list(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
            safe=False
        )
    else:  # POST
        content = json.loads(request.body)

        employee_id = content.get("employee_id")
        if Salesperson.objects.filter(employee_id=employee_id).exists():
            return JsonResponse({"message": "Salesperson already exists"})

        new_salesperson = Salesperson.objects.create(
            first_name=content['first_name'],
            last_name=content['last_name'],
            employee_id=employee_id

        )
        return JsonResponse(
            new_salesperson,
            encoder=SalespersonEncoder,
            safe=False,
            status=201
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def salespeople_detail(request, id):
    salesperson = get_object_or_404(Salesperson, id=id)

    if request.method == "GET":
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False
        )
    elif request.method == "PUT":
        context = json.loads(request.body)
        for key, value in context.items():
            setattr(salesperson, key, value)
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
    elif request.method == "DELETE":
        salesperson.delete()
        return JsonResponse({"message": "Salesperson Deleted"}, status=204)


@require_http_methods(["GET", "POST"])
def customers_list(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False
        )
    else:  # POST
        content = json.loads(request.body)
        new_customer = Customer.objects.create(
            first_name=content['first_name'],
            last_name=content['last_name'],
            address=content['address'],
            phone_number=content['phone_number']
        )
        return JsonResponse(
            new_customer,
            encoder=CustomerEncoder,
            safe=False,
            status=201
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def detail_customers(request, id):
    try:
        customer = Customer.objects.get(id=id)
    except customer.DoesNotExist:
        return JsonResponse(
            {"Message": "Customer does not exist"},
            status=404
        )
    if request.method == "GET":
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )
    elif request.method == "PUT":
        context = json.loads(request.body)
        for key, value in context.items():
            setattr(customer, key, value)
            customer.save()
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        customer.delete()
        return JsonResponse({"message": "Customer Deleted"}, status=204)


@require_http_methods(["GET", "POST"])
def sales_list(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False
        )
    else:  # POST
        content = json.loads(request.body)

        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            customer = Customer.objects.get(id=content["customer"])
        except (AutomobileVO.DoesNotExist, Salesperson.DoesNotExist, Customer.DoesNotExist) as e:
            return JsonResponse(
                {"message": str(e)},
                status=400
            )

        sale = Sale.objects.create(
            automobile=automobile,
            salesperson=salesperson,
            customer=customer,
            price=content["price"]
        )
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
            status=201
        )


@require_http_methods(["DELETE"])
def sale_detail(request, id):
    sale = get_object_or_404(Sale, id=id)
    if request.method == "DELETE":
        sale.delete()
        return JsonResponse({"message": "Sale Deleted"}, status=204)


@require_http_methods(["GET"])
def unsold_automobiles(request):
    automobiles = AutomobileVO.objects.filter(sold=False)
    return JsonResponse(
        {"automobiles": list(automobiles.values())},
        encoder=AutomobileVOEncoder,
        safe=False
    )


@require_http_methods(["GET", "POST"])
def automobiles_list(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": list(automobiles.values())},
            encoder=AutomobileVOEncoder,
            safe=False
        )
    else:  # POST
        content = json.loads(request.body)
        new_automobile = AutomobileVO.objects.create(
            vin=content['vin'],
            sold=content['sold']
        )
        return JsonResponse(
            new_automobile,
            encoder=AutomobileVOEncoder,
            safe=False,
            status=201
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def automobile_detail(request, id):
    try:
        automobile = AutomobileVO.objects.get(id=id)
    except AutomobileVO.DoesNotExist:
        return JsonResponse({"message": "Automobile doesn't exist"}, status=404)
    if request.method == "GET":
        return JsonResponse(
            automobile,
            encoder=AutomobileVOEncoder,
            safe=False
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        for key, value in content.items():
            setattr(automobile, key, value)
        automobile.save()
        return JsonResponse(
            automobile,
            encoder=AutomobileVOEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        automobile.delete()
        return JsonResponse(
            {"message": "Automobile deleted successfully"},
            status=204
        )


@require_http_methods(["GET"])
def sales_history(request, salesperson_id):
    sales = Sale.objects.filter(salesperson_id=salesperson_id).select_related('customer', 'automobile')
    sales_data = [{
        'id': sale.id,
        'salesperson': f'{sale.salesperson.first_name} {sale.salesperson.last_name}',
        'customer': f'{sale.customer.first_name} {sale.customer.last_name}',
        'automobile_vin': sale.automobile.vin,
        'price': sale.price,
    } for sale in sales]
    return JsonResponse({'sales': sales_data})

# @require_http_methods(["GET", "POST"])
# def manufacturers_list(request):
#     if request.method == "GET":
#         manufacturers = Manufacturer.objects.all()
#         return JsonResponse(
#             {"manufacturers": manufacturers},
#             encoder=ManufacturerEncoder,
#             safe=False
#         )
#     else:  # POST
#         content = json.loads(request.body)
#         new_manufacturer = Manufacturer.objects.create(
#             name=content['name']
#         )
#         return JsonResponse(
#             new_manufacturer,
#             encoder=ManufacturerEncoder,
#             safe=False,
#             status=201
#         )
# @require_http_methods(["GET", "POST"])
# def automobiles_list(request):
#     if request.method == "GET":
#         automobiles = AutomobileVO.objects.all()
#         return JsonResponse(
#             {"automobiles": automobiles},
#             encoder=AutomobileVOEncoder,
#             safe=False
#         )
#     else:  # POST
#         content = json.loads(request.body)
#         new_automobile = AutomobileVO.objects.create(
#             vin=content['vin'],
#             sold=content['sold']
#         )
#         return JsonResponse(
#             new_automobile,
#             encoder=AutomobileVOEncoder,
#             safe=False,
#             status=201
#         )


# @require_http_methods(["GET", "PUT", "DELETE"])
# def automobiles_detail(request, id):
#     automobile = get_object_or_404(AutomobileVO, id=id)

#     if request.method == "GET":
#         return JsonResponse(
#             automobile,
#             encoder=AutomobileVOEncoder,
#             safe=False
#         )
#     elif request.method == "PUT":
#         context = json.loads(request.body)
#         for key, value in context.items():
#             setattr(automobile, key, value)
#             automobile.save()
#         return JsonResponse(
#             automobile,
#             encoder=AutomobileVOEncoder,
#             safe=False
#         )
#     elif request.method == "DELETE":
#         automobile.delete()
#         return JsonResponse({"message": "Automobile Deleted"}, status=204)
