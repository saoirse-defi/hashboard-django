from django.urls import path
from . import views
# from .views import get_user_addresses

urlpatterns = [
    # path('user-addresses/', views.get_user_addresses, name='user_addresses'),
    path('eth-balance/', views.get_eth_balance, name='get_eth_balance'),
    path('save-address/', views.save_address, name='save_address'),
    path('user-addresses/', views.get_user_addresses, name='get_user_addresses'),
]