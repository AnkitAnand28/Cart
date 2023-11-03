from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('address', views.CustomerAddressViewSet)
router.register('productrating', views.ProductRatingViewSet)

urlpatterns = [
    # Vendors
    path('vendors/', views.VendorList.as_view()),
    path('vendor/<int:pk>/', views.VendorDetail.as_view()),
    # Products
    path('products/', views.ProductList.as_view()),
    path('product/<int:pk>/', views.ProductDetail.as_view()),
    path('product_imgs/<int:product_id>/', views.ProductImageList.as_view(), name='product-image-list'),
    path('productsearch/', views.ProductSearchView.as_view(), name='product-search'),
    # Products Categories
    path('categories/', views.CategoryList.as_view()),
    path('category/<int:pk>/', views.CategoryDetail.as_view()),
    # Customers
    path('customers/', views.CustomerList.as_view()),
    path('customer/<int:pk>/', views.CustomerDetail.as_view()),
    path('user/<int:pk>/', views.UserDetail.as_view()),
    path('customer/login/', views.customer_login,name='customer_login'),
    path('customer/register/', views.customer_register,name='customer_register'),
    path('customer/<int:pk>/address/', views.CustomerAddressViewSet.as_view({'get': 'list'})),

    # Orders
    path('orders/', views.OrderList.as_view()),
    path('order/<int:pk>/', views.OrderDetail.as_view()),
    path('orderitems/', views.OrderItemList.as_view()),
    path('customer/<int:pk>/orderitems/', views.CustomerOrderItemList.as_view()),
]

urlpatterns+=router.urls