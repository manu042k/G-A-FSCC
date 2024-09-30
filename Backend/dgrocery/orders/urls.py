from django.urls import path, include 
from rest_framework.routers import DefaultRouter 
from .views import   CartItemListCreateView, OrderAPIView, PaymentViewSet, ShippingViewSet

router = DefaultRouter()
router.register('payments', PaymentViewSet, basename='payment')
router.register('shippings', ShippingViewSet, basename='shipping')

urlpatterns = [
    path('api/', include(router.urls)),
    path('cart-items/', CartItemListCreateView.as_view(), name='cart-item-list-create'),
    path('orders/', OrderAPIView.as_view(), name='order-list-create'),  

]
