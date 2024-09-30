from products.models import Product
from products.serializers import ProductSerializer
from rest_framework import serializers
from .models import CartItem, Order, Payment, Shipping


class CartItemSerializer(serializers.ModelSerializer):
    """Serializer for Cart"""
    product = ProductSerializer()  

    class Meta:
        model = CartItem
        fields = ['id', 'user', 'product', 'quantity', 'created_at', 'updated_at']

class CartCreateItemSerializer(serializers.ModelSerializer):
    """Serializer for creating a new CartItem"""
    class Meta:
        model = CartItem
        fields = ['id', 'user', 'product', 'quantity', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at','user']

    def create(self, validated_data):
        user = self.context['request'].user  
        product = validated_data['product']

        existing_cart_items = CartItem.objects.filter(user=user, product=product)
        existing_cart_items.delete()
        

        cart_item = CartItem.objects.create(user=user, **validated_data)
        return cart_item
    


class OrderSerializer(serializers.ModelSerializer):
    """ Serializer for Order"""
    class Meta:
        model = Order
        fields = ['id', 'user', 'total_price',]


class PaymentSerializer(serializers.ModelSerializer):
    """ Serializer for Payment"""
    class Meta:
        model = Payment
        fields = ['id', 'order', 'payment_method', 'amount', 'status', 'payment_date']
        read_only_fields = ['id', 'payment_date']



class ShippingSerializer(serializers.ModelSerializer):
    """ Serializer for Shipping"""
    class Meta:
        model = Shipping
        fields = ['id', 'order', 'shipping_address', 'tracking_number', 'status', 'estimated_delivery_date']
        read_only_fields = ['id']