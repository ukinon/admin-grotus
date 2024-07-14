export type Product = {
  id?: number;
  name?: string;
  price?: number;
  variant?: string;
  product_id?: number;
  description?: string;
  photo?: string;
  stock?: number;
  rating?: {
    id: number;
    user_id: number;
    rating: number;
  };
  ratings_average?: number;
  ratings_count?: number;
  amount?: number;
  loved?: boolean;
  nutrition_types?: NutritionType[] | number[];
  images?: File[] | Blob[] | MediaSource[] | null;
};

export type NutritionType = {
  id?: number;
  name?: string;
};
