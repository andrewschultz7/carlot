import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO, SalesPersonVO, CustomerVO
def get_automobile():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            import_href=automobile["href"],
            defaults={
                'vin': automobile['vin'],
                "sold": automobile["sold"],
                "import_href": automobile["href"],
            },
        )

# def get_employee():
#     response = requests.get("http://salespeople-api:8090/api/salespeople/")
#     content = json.loads(response.content)
#     for sales_person in content["sales_person"]:
#         SalesPersonVO.objects.update_or_create(
#             import_href=sales_person["href"],
#             defaults={
#                 'name': sales_person['name'],
#                 'employee_number': sales_person['employee_number'],
#             },
#         )

# def get_customer():
#     response = requests.get("http://customers-api:8090/api/customers/")
#     content = json.loads(response.content)
#     for customer in content["customers"]:
#         CustomerVO.objects.update_or_create(
#             import_href=customer["href"],
#             defaults={
#                 'name': customer['name'],
#                 'address': customer['address'],
#                 'phone': customer['phone'],
#             }
#         )

def poll():
    while True:
        print('Sales poller polling for data')
        # print("CAN YOU SEE THIS UPDATE")
        try:
            # Write your polling logic, here
            get_automobile()
            # get_employee()
            # get_customer()
            print("*******CAN YOU SEE ME?*******")
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)


if __name__ == "__main__":
    poll()
