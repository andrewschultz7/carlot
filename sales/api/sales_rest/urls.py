from django.urls import path
from .views import list_sales, sale_detail, sales_history, list_salespeople, salesperson_detail, list_customers, customer_detail

urlpatterns = [
    path("sales/", list_sales, name="list_sales"),
    path("sales/<int:pk>/", sale_detail, name="sale_detail"),
    path("saleshistory/", sales_history, name="sales_history"),
    path("salespeople/", list_salespeople, name="list_salespeople"),
    path("salespeople/<int:pk>/", salesperson_detail, name="salesperson_detail"),
    path("customers/", list_customers, name="list_customers"),
    path("customer/<int:pk>/", customer_detail, name="customer_detail"),
]
