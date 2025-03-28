from django.urls import path
from . import views

urlpatterns = [
    path("addresses/", views.AddressListCreate.as_view(), name="address-list"),
    path('addresses/<int:address_id>/etherscan/', views.address_etherscan_update),
    path("addresses/delete/<int:pk>/", views.AddressDelete.as_view(), name="delete-address"),
]