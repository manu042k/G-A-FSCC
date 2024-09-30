from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    """ Serializer for category"""
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    """ Serializer for product"""
    class Meta:
        model = Product
        fields = ['id', 'category', 'name', 'price', 'quantity', 'image', 'created_at', 'updated_at']
