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
    response = requests.get("http://localhost:8100/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content["automobiles"]:
        AutomobileVO.objects.update_or_create(
            import_href=automobile["href"],
            defaults={
                'vin': automobile['vin'],
                'sold': automobile['sold'],
            },
        )

def get_employee():
    response = requests.get("http://localhost:8100/api/employees/")
    content = json.loads(response.content)
    for sales_person in content["sales_person"]:
        SalesPersonVO.objects.update_or_create(
            import_href=sales_person["href"],
            defaults={
                'name': sales_person['name'],
                'employee_number': sales_person['employee_number'],
            },
        )

def get_customer():
    response = requests.get("http://localhost:8100/api/customers/")
    content = json.loads(response.content)
    for customer in content["customers"]:
        CustomerVO.objects.update_or_create(
            import_href=customer["href"],
            defaults={
                'name': customer['name'],
                'address': customer['address'],
                'phone': customer['phone'],
            }
        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            get_automobile()
            print("*******CAN YOU SEE ME?*******")
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
