from django.urls import path
from . import views

urlpatterns = [
    path('salespeople/', views.salespeople_list, name='salespeople_list'),
    path('salespeople/<int:id>/', views.salespeople_detail, name='salespeople_detail'),
    path('customers/', views.customers_list, name='customers_list'),
    path('customers/<int:id>/', views.detail_customers, name='detail_customers'),
    path('automobiles/', views.automobiles_list, name='automobiles_list'),
    path('sales/', views.sales_list, name='sales_list'),
    path('sales/<int:id>/', views.sale_detail, name='sales_detail'),
    path('automobiles/<int:id>/', views.automobile_detail, name='automobile_detail'),
    path('automobiles/unsold/', views.unsold_automobiles, name='unsold_automobiles'),
    path('api/saleshistory/<int:salesperson_id>/', views.sales_history, name='sales_history'),
]
