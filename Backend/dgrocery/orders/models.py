from django.db import models
from django.conf import settings
from products.models import Product

from django.db import models
from django.conf import settings
from .models import Product  


class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('canceled', 'Canceled'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('net_banking', 'Net Banking'),
        ('wallet', 'Wallet'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    payment_date = models.DateTimeField(auto_now_add=True)


class Shipping(models.Model):
    STATUS_CHOICES = [
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    shipping_address = models.TextField()
    tracking_number = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='processing')
    estimated_delivery_date = models.DateTimeField()

  