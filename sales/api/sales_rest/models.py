from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField()

class SalesPersonVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=200)

class CustomerVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)

class Sale(models.Model):
    price = models.PositiveBigIntegerField()
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name = "sales",
        on_delete = models.PROTECT,
    )
    sales_person = models.ForeignKey(
        SalesPersonVO,
        related_name = "sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        CustomerVO,
        related_name="sales",
        on_delete=models.PROTECT,
    )
