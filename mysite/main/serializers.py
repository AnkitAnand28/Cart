from rest_framework import serializers
from . import models
from django.contrib.auth.models import User

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id','user', 'address']

    def __init__(self, *args, **kwargs):
        super(VendorSerializer, self).__init__(*args, **kwargs)  

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id', 'user', 'address'] 


    def __init__(self, *args, **kwargs):
        super(VendorDetailSerializer, self).__init__(*args, **kwargs)  


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        product_ratings = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
        model = models.Product
        fields = ['id', 'category', 'vendor','title', 'detail', 'price', 'product_ratings'] 


    def __init__(self, *args, **kwargs):
        super(ProductListSerializer, self).__init__(*args, **kwargs)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductImage
        fields=['id','product','image']


class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        product_ratings = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
        product_imgs = ProductImageSerializer(many=True, read_only=True)
        model = models.Product
        fields = ['id', 'category', 'vendor','title', 'detail', 'price','product_ratings','product_imgs'] 


    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer, self).__init__(*args, **kwargs)  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'username', 'email']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id','user', 'mobile']

    def __init__(self, *args, **kwargs):
        super(CustomerSerializer, self).__init__(*args, **kwargs)    
        

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id', 'user', 'mobile'] 

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['user']=UserSerializer(instance.user).data
        
        return response

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['id','customer']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.OrderItems
        fields=['id','order','product','qty','price']

class CustomerOrderItemSerializer(serializers.ModelSerializer):
    order=OrderSerializer()
    product=ProductDetailSerializer()
    class Meta:
        model=models.OrderItems
        fields=['id','order','product','qty','price']

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItems
        fields = ['id','order','product']

    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer, self).__init__(*args, **kwargs)    
        self.Meta.depth = 1        


class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomerAddress
        fields = ['id','customer','address','default_address']

    def __init__(self, *args, **kwargs):
        super(CustomerAddressSerializer, self).__init__(*args, **kwargs)    
        self.Meta.depth = 1        



class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductRating
        fields = ['id','customer','product','rating', 'reviews', 'add_time']

    def __init__(self, *args, **kwargs):
        super(ProductRatingSerializer, self).__init__(*args, **kwargs)    
           


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = ['id','title', 'detail']

    def __init__(self, *args, **kwargs):
        super(CategorySerializer, self).__init__(*args, **kwargs)    
        

class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = ['id', 'title', 'detail'] 


    def __init__(self, *args, **kwargs):
        super(CategoryDetailSerializer, self).__init__(*args, **kwargs)    
               
