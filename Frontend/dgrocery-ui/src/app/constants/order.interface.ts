export interface Order {
  id: number;
  user: number;
  total_price: string;
}

export interface OrderItem {
  payment_method: string;
  shipping_address: string;
}
export interface Payment {
  id: number;
  order: number;
  payment_method: string;
  amount: string;
  status: string;
  payment_date: string; 
}

export interface Shipping {
  id: number;
  order: number;
  shipping_address: string;
  tracking_number: string;
  status: string;
  estimated_delivery_date: string; 
}

export interface OrderResponse {
  detail: string;
  order: Order;
  payment: Payment;
  shipping: Shipping;
}
