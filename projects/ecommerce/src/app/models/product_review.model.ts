export interface ProductReview {
  id: number | null;
  product_id: number;
  user_id?: number;
  name: string;
  email: string;
  title?: string;
  content?: string;
  rating: number;
  like_count?: number;
  dislike_count?: number;
  is_verified?: number;
  is_user_like?: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}
