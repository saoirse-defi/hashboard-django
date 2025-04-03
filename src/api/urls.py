from django.urls import path
from . import views

urlpatterns = [
    path('eth-balance/', views.get_eth_balance, name='get_eth_balance'),
]