export interface ProductModel {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  category_id: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}
