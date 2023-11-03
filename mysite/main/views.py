from django.shortcuts import render
from . import serializers
from rest_framework import generics, permissions,pagination, viewsets
from . import models
from .paginations import CustomPagination
from .models import Product

from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse
from django.views import View
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.views import APIView

from .models import ProductImage
from .serializers import ProductImageSerializer

class YourApiView(APIView):
    pagination_class = CustomPagination

class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer
    


class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorDetailSerializer



class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        category_id = self.request.GET.get('category')  
        if category_id is not None:
            try:
                category = models.ProductCategory.objects.get(id=category_id)
                return models.Product.objects.filter(category=category)
            except models.ProductCategory.DoesNotExist:
                return models.Product.objects.none()
        else:
            return models.Product.objects.all()



class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer 
    pagination_class = pagination.PageNumberPagination   



class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer
    


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer


@csrf_exempt
def customer_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            customer=models.Customer.objects.get(user=user)
            msg = {
                'bool': True,
                'user': user.username,
                'id':customer.id,
            }
        else:
            msg = {
                'bool': False,
                'msg': 'Invalid Username/Password'
            }
        return JsonResponse(msg)

@csrf_exempt
def customer_register(request):
    if request.method == 'POST':
        data = request.POST  
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        username = data.get('username')
        email = data.get('email')
        mobile = data.get('mobile')
        password = data.get('password')
        
        try:
           
            User = get_user_model()
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=firstname,
                last_name=lastname
            )

            if user:
                try:
                    customer = models.Customer.objects.create(
                        user=user,
                        mobile=mobile
                    )
                    msg = {
                        'bool': True,
                        'user': user.id,
                        'customer': customer.id,
                        'msg': 'Thank you for your registration'
                    }
                except IntegrityError:
                    msg = {
                        'bool': False,
                        'msg': 'Mobile already exists!'
                    }
            else:
                msg = {
                    'bool': False,
                    'msg': 'Oops... something went wrong'
                }
        except IntegrityError:
            msg = {
                'bool': False,
                'msg': 'Username or email already exists!'
            }
    else:
        msg = {
            'bool': False,
            'msg': 'Invalid request method. Use POST.'
        }

    return JsonResponse(msg)
    

class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    
    
class OrderItemList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer


class CustomerOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.CustomerOrderItemSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        customer_id=self.kwargs['pk']
        qs=qs.filter(order__customer__id=customer_id)
        return qs



class OrderDetail(generics.ListAPIView):
    # queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderDetailSerializer    


    def get_queryset(self):
        order_id = self.kwargs['pk']
        order=models.Order.objects.get(id=order_id)
        order_items=models.OrderItems.objects.filter(order=order)
        return order_items
    
class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAddressSerializer
    queryset= models.CustomerAddress.objects.all()


class ProductRatingViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProductRatingSerializer
    queryset= models.ProductRating.objects.all()    


class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer
    pagination_class = pagination.PageNumberPagination


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer
    pagination_class = pagination.PageNumberPagination


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer  


class ProductImageList(generics.ListAPIView):
    serializer_class = ProductImageSerializer

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return ProductImage.objects.filter(product_id=product_id)
    

class ProductSearchView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        search_query = self.request.query_params.get('search', '')
        if search_query:
            
            queryset = Product.objects.filter(title__icontains=search_query)
        else:
            queryset = Product.objects.all()
        return queryset    

