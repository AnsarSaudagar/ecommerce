export interface CartModel {
  id?: number;
  user_id: number;
  product_id: number;
  count?: number;
  status?: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}
