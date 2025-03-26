from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, AddressSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Address

class AddressListCreate(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Address.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class AddressDelete(generics.DestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Address.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
def address_etherscan_update(request, address_id):
    try:
        address = Address.objects.get(pk=address_id)
        address.etherscan_data = request.data['etherscan_data']
        address.save()
        return Response(status=status.HTTP_200_OK)
    except Address.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)