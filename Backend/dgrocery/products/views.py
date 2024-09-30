from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework import viewsets,status
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for category"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return []
        else:
            return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        return Response({"detail": "Creation of categories is not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        return Response({"detail": "Deletion of categories is not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class ProductViewSet(viewsets.ModelViewSet):
    """ViewSet for product"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve','products_by_category']:
            return []
        else:
            return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        return Response({"detail": "Creation of products is not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        return Response({"detail": "Deletion of products is not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='by-category/(?P<category_id>\d+)')
    def products_by_category(self, request, category_id=None):
        products = Product.objects.filter(category_id=category_id)
        if not products.exists():
            return Response({"detail": "No products found for this category."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)