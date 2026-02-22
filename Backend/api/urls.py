from django.urls import path
from .views import (
    ProductListView, ProductDetailView,
    CategoryListView,
    OrderCreateView, OrderDetailView,
    ContactCreateView
)

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('orders/', OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
]
