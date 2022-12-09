from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class SalesPerson(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=200)

class Customer(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)

class Sale(models.Model):
    auto = models.ForeignKey(
        AutomobileVO,
        related_name = "sales",
        on_delete = models.PROTECT,
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name = "sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    price = models.PositiveBigIntegerField()

