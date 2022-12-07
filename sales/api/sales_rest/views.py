from django.shortcuts import render
from .models import AutomobileVO, SalesPersonVO, CustomerVO, Sale
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
    model = SalesPersonVO
    properties = [
        "name",
        "employee_number",
        "id",
    ]

class CustomerVODetailEncoder(ModelEncoder):
    model = CustomerVO
    properties = [
        "name",
        "address",
        "phone",
        "id",
    ]

class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = {
        "price",
        "automobile",
        "sales_person",
        "customer",
        "id",
    }

class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "sales_person",
        "customer",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "sales_person": SalesPersonVODetailEncoder(),
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
        print(content, "*******LOOK HERE*******")

        try:
            automobile_href = content["automobile"]
            automobile = AutomobileVO.objects.get(import_href=automobile_href)
            print(automobile, "*******LOOK HERE*******")
            content["automobile"] = automobile

            sales_person_href = content["sales_person"]
            sales_person = SalesPersonVO.objects.get(import_href=sales_person_href)
            print(sales_person, "*******LOOK HERE*******")
            content["sales_person"] = sales_person

            customer_href = content["customer"]
            customer = CustomerVO.objects.get(import_href=customer_href)
            print(customer, "*******LOOK HERE*******")
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
