export type Transaction = {
  id?: number;
  name?: string;
  address?: string;
  phone?: string;
  payment_method?: string;
  delivery_method?: null;
  status?: string;
  products?: TransactionProduct[];
  paid_at?: Date;
  created_at?: Date;
  updated_at?: Date;
};

export type TransactionProduct = {
  id?: number;
  product_id?: number;
  transaction_id?: number;
  name?: string;
  price?: number;
  amount?: number;
  rating?: Rating;
  nutrition_types?: any[];
};

export type Rating = {
  id?: number;
  user_id?: number;
  product_id?: number;
  rating?: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
};
