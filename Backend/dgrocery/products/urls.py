from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet


router = DefaultRouter()
router.register('category', CategoryViewSet, basename='category')
router.register('items', ProductViewSet, basename='items')

urlpatterns = [
    path('api/', include(router.urls)),  
]

