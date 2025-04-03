from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from .serializers import UserSerializer, AddressSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Address
import logging
import requests
import os

logger = logging.getLogger(__name__)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# @api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
# def get_user_addresses(request):
#     user = request.user
#     serializer = UserSerializer(user)
#     return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_eth_balance(request):
    addressId = request.data.get('addressId')

    if not addressId:
        return Response({'error': 'addressId is required'}, status=status.HTTP_400_BAD_REQUEST)
    etherscan_api_key = os.getenv('etherscan_api_key') # Replace with your actual Etherscan API key.
    try:
        etherscan_api_url = f'https://api.etherscan.io/api?module=account&action=balance&address={addressId}&tag=latest&apikey={etherscan_api_key}'
        response = requests.get(etherscan_api_url)
        response.raise_for_status()
        data = response.json()
        return Response(data, status=status.HTTP_200_OK)

    except InvalidToken as e:
        logger.error(f"Invalid JWT Token: {e}")
        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    except AuthenticationFailed as e:
        logger.error(f"Authentication Failed: {e}")
        return Response({"error": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        logger.exception("An unexpected error occurred:")
        return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except ValueError:
        return Response({'error': 'Invalid JSON response from Etherscan API'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def save_address(request):
    try:
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user) #Assign the user.
            logger.info(f"Address saved: {serializer.data}") #Log saved data.
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Invalid address data: {serializer.errors}") #Log errors.
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.exception("Error saving address:")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_addresses(request):
    try:
        addresses = Address.objects.filter(author=request.user)
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.exception("Error retrieving addresses:")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)