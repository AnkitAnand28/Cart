from django.contrib import admin
from .models import Vendor, Product, ProductCategory, Customer, Order, OrderItems, CustomerAddress, ProductRating, ProductImage
from . import models

admin.site.register(Vendor)
admin.site.register(ProductCategory)

class CustomerAdmin(admin.ModelAdmin):
    list_display=['get_username','mobile']
    def get_username(self,obj):
        return obj.user.username
# admin.site.register(CustomerAdmin)    
admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(OrderItems)
admin.site.register(CustomerAddress)
admin.site.register(ProductRating)
admin.site.register(ProductImage)