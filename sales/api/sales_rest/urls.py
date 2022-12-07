from django.urls import path
from .views import list_sales, sale_detail

urlpatterns = [
    path("sales/", list_sales, name="list_sales"),
    path("sales/<int:pk>/", sale_detail, name="sale_detail")
]
