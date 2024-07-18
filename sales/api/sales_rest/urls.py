from django.urls import path
from . import views

urlpatterns = [
    path('salespeople/', views.salespeople_list, name='salespeople_list'),
    path('salespeople/<int:id>/', views.salespeople_detail, name='salespeople_detail'),
    path('customers/', views.customers_list, name='customers_list'),
    path('customers/<int:id>/', views.detail_customers, name='detail_customers'),
    # path('automobiles/<int:id>/', views.automobiles_detail, name='automobiles_detail'),
    path('sales/', views.sales_list, name='sales_list'),
    path('sales/<int:id>/', views.sale_detail, name='sales_detail'),
]
