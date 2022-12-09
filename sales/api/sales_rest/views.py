from django.shortcuts import render
from .models import AutomobileVO, SalesPerson, Customer, Sale
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse

# Create your views here.

class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "sold",
        "id",
    ]

class SalesPersonVODetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "import_href",
        "name",
        "employee_number",
        "id",
    ]

class SalespeopleEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "import_href",
        "name",
        "employee_number",
        "id",
    ]

class CustomerVODetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "import_href",
        "name",
        "address",
        "phone",
        "id",
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "import_href",
        "name",
        "address",
        "phone",
        "id",
    ]

class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = {
        "price",
        "auto",
        "salesperson",
        "customer",
        "id",
    }
    encoders = {
    "auto": AutomobileVODetailEncoder(),
    "salesperson": SalesPersonVODetailEncoder(),
    "customer": CustomerVODetailEncoder(),
    }

class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "auto",
        "salesperson",
        "customer",
        "id",
    ]
    encoders = {
        "auto": AutomobileVODetailEncoder(),
        "salesperson": SalesPersonVODetailEncoder(),
        "customer": CustomerVODetailEncoder(),
    }

@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleListEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            automobile_href = content["auto"]
            automobile = AutomobileVO.objects.get(vin=automobile_href)
            content["auto"] = automobile

            salesperson_href = content["salesperson"]
            salesperson = SalesPerson.objects.get(id=salesperson_href)
            content["salesperson"] = salesperson

            customer_href = content["customer"]
            customer = Customer.objects.get(id=customer_href)
            content["customer"] = customer

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Bad automobile ID"},
                status=400,
            )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def sales_history(request):
    if request.method == "GET":
        sales = Sale.objects.filter()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleListEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            automobile_href = content["automobile"]
            automobile = AutomobileVO.objects.get(import_href=automobile_href)
            content["automobile"] = automobile

            sales_person_href = content["sales_person"]
            sales_person = SalesPerson.objects.get(import_href=sales_person_href)
            content["sales_person"] = sales_person

            customer_href = content["customer"]
            customer = Customer.objects.get(import_href=customer_href)
            content["customer"] = customer

        except AutomobileVO.DoesNotExist:
            return json(
                {"message": "Bad automobile ID"},
                status=400,
            )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def sale_detail(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SaleDetailEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Invalid sale ID"}, status=400)
    elif request.method == "PUT":
        content = json.loads(request.body)

        try:
            if "automobile" in content:
                automobile = AutomobileVO.objects.get(automobile=content["automobile"])
                content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile"},
                status=400,
            )
        Sale.objects.filter(id=pk).update(**content)
        sale = Sale.objects.get(id=pk)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False,
        )
    else:
        try:
            count, _ = Sale.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
                )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sale ID"},
                status=400
            )

@require_http_methods(["GET", "POST"])
def list_salespeople(request):

    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespeopleEncoder
        )
    else:
        content = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonVODetailEncoder,
            safe=False
        )

@require_http_methods(["DELETE", "GET"])
def salesperson_detail(request, pk):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonVODetailEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson"},
                status=400,
            )
    else:
        try:
            count, _ = SalesPerson.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson ID"},
                status=400
            )

@require_http_methods(["GET", "POST"])
def list_customers(request):

    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder = CustomerListEncoder
        )
    else:
        content = json.loads(request.body)

        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerVODetailEncoder,
            safe=False
        )

@require_http_methods(["DELETE", "GET"])
def customer_detail(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerVODetailEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer ID"},
                status=400,
            )
    else:
        try:
            count, _ = Customer.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer ID"},
                status=400,
            )
