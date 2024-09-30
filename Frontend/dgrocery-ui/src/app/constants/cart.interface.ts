import { Product } from './product.interface';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface CartPostItem {
  product: number;
  quantity: number;
}
