from datetime import datetime, timedelta
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import CartItem, Order, Payment, Shipping
from .serializers import    CartCreateItemSerializer, CartItemSerializer, OrderSerializer, PaymentSerializer, ShippingSerializer
import random
import string
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView


class CartItemListCreateView(APIView):
    """
    API view to create and retrieve cart items for the authenticated user.
    """
    def post(self, request):
        serializer = CartCreateItemSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderAPIView(ListCreateAPIView):
    """
    API view to retrieve and create orders for the authenticated user.
    """
    serializer_class = OrderSerializer  

    def get_queryset(self):
        """Return all orders for the authenticated user."""
        return Order.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        cart_items = CartItem.objects.filter(user=request.user)

        if not cart_items.exists():
            return Response({"detail": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        total_price = self.calculate_total_price(cart_items)

        order_data = {
            'user': request.user.id,
            'total_price': total_price,
        }
        order_serializer = self.get_serializer(data=order_data)
        order_serializer.is_valid(raise_exception=True)
        order = order_serializer.save()

        payment = self.create_payment(order, total_price, request.data.get('payment_method'))

        shipping = self.create_shipping(order, request.data)

        self.reduce_product_quantity(cart_items)

        cart_items.delete()

        response_data = {
            "order": order_serializer.data,               
            "payment": PaymentSerializer(payment).data,   
            "shipping": ShippingSerializer(shipping).data, 
        }

        return Response({
            "detail": "Order placed successfully!",
            **response_data
        }, status=status.HTTP_201_CREATED)

    def calculate_total_price(self, cart_items):
        """Calculate the total price of the cart items."""
        return sum(item.product.price * item.quantity for item in cart_items)

    def create_payment(self, order, total_price, payment_method):
        """Create a payment record and return the payment instance."""
        payment_data = {
            'order': order.id,
            'payment_method': payment_method,
            'amount': total_price,
            'status': 'completed',  
            'payment_date': datetime.now()
        }
        payment_serializer = PaymentSerializer(data=payment_data)
        payment_serializer.is_valid(raise_exception=True)
        return payment_serializer.save()

    def create_shipping(self, order, request_data):
        """Create a shipping record and return the shipping instance."""
        shipping_data = {
            'order': order.id,
            'shipping_address': request_data.get('shipping_address'),
            'tracking_number': self.generate_tracking_id(),
            'status': 'processing',  
            'estimated_delivery_date': datetime.now() + timedelta(days=random.randint(1, 7)),  
        }
        shipping_serializer = ShippingSerializer(data=shipping_data)
        shipping_serializer.is_valid(raise_exception=True)
        return shipping_serializer.save()

    def generate_tracking_id(self, length=10):
        """Generate a random tracking ID."""
        characters = string.ascii_uppercase + string.digits
        tracking_id = ''.join(random.choices(characters, k=length))
        return tracking_id

    def reduce_product_quantity(self, cart_items):
        """Reduce the quantity of products based on the items in the cart."""
        for item in cart_items:
            product = item.product
            if product.quantity >= item.quantity:
                product.quantity -= item.quantity
                product.save()
            else:
                raise ValueError(f"Insufficient stock for product: {product.name}")
            

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class ShippingViewSet(viewsets.ModelViewSet):
    queryset = Shipping.objects.all()
    serializer_class = ShippingSerializer








# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer

#     def get_queryset(self):
#         return self.queryset.filter(user=self.request.user)

#     def create(self, request, *args, **kwargs):
#         cart_items = CartItem.objects.filter(user=request.user)

#         if not cart_items.exists():
#             return Response({"detail": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

#         total_price = self.calculate_total_price(cart_items)
#         order_data = self.create_order_data(cart_items, total_price, request.user.id)

#         order = self.create_order(order_data)

#         # payment = self.create_payment(order, total_price, request.data.get('payment_method'))
#         # shipping = self.create_shipping(order, request.data)

#         # Reduce product quantity
#         # self.reduce_product_quantity(cart_items)

#         # Clear cart items
#         cart_items.delete()

#         return Response({
#             "detail": "Order placed successfully!",
#             "order_id": 1,
#             "payment_id": 1,
#             "shipping_id": 1,
#         }, status=status.HTTP_201_CREATED)

#     def calculate_total_price(self, cart_items):
#         """Calculate the total price of the cart items."""
#         return sum(item.product.price * item.quantity for item in cart_items)

#     def create_order_data(self, cart_items, total_price, user_id):
#         """Create order data dictionary."""
#         return {
#             'user': user_id,
#             'total_price': total_price,
#             'items': [
#                 {
#                     'product': item.product.id,
#                     'quantity': item.quantity,
#                     'price_at_time': item.product.price,
#                 } for item in cart_items
#             ]
#         }

#     def create_order(self, order_data):
#         """Create an order and return the order instance."""
#         order_serializer = OrderSerializer(data=order_data)
#         order_serializer.is_valid(raise_exception=True)
#         return order_serializer.save()

#     def create_payment(self, order, total_price, payment_method):
#         """Create a payment record and return the payment instance."""
#         payment_data = {
#             'order': order.id,
#             'payment_method': payment_method,
#             'amount': total_price,
#             'status': 'completed',  # Adjust status as needed
#             'payment_date': datetime.now()
#         }
#         payment_serializer = PaymentSerializer(data=payment_data)
#         payment_serializer.is_valid(raise_exception=True)
#         return payment_serializer.save()

#     def create_shipping(self, order, request_data):
#         """Create a shipping record and return the shipping instance."""
#         shipping_data = {
#             'order': order.id,
#             'shipping_address': request_data.get('shipping_address'),
#             'tracking_number': self.generate_tracking_id(),
#             'status': 'processing',  # Adjust status as needed
#             'estimated_delivery_date': request_data.get('estimated_delivery_date'),  # Optional
#         }
#         shipping_serializer = ShippingSerializer(data=shipping_data)
#         shipping_serializer.is_valid(raise_exception=True)
#         return shipping_serializer.save()
    
#     def generate_tracking_id(self, length=10):
#         """Generate a random tracking ID."""
#         characters = string.ascii_uppercase + string.digits
#         tracking_id = ''.join(random.choices(characters, k=length))
#         return tracking_id

#     def reduce_product_quantity(self, cart_items):
#         """Reduce the quantity of products based on the items in the cart."""
#         for item in cart_items:
#             product = item.product
#             # Check if there's enough stock to reduce
#             if product.quantity >= item.quantity:
#                 product.quantity -= item.quantity
#                 product.save()
#             else:
#                 # Handle case where there's insufficient stock
#                 raise ValueError(f"Insufficient stock for product: {product.name}")
