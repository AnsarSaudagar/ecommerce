export interface ProductModel {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string | null;
  category_id: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: {
    id: number,
    name: string,
    image: string,
    creationAt: Date,
    updatedAt: Date,
  };
  images: string[];
  creationAt: Date;
  updatedAt: Date;  
  viewCount?: number;
  discount?: number;
  purchaseCount?: number;
  size?: string[];
  countStocks?: number;
  sale?: number;
  color?: string[];
  gender?: string;
  reviews?: {
    username: string;
    star: number;
    email?: string;
    reviewTitle: string;
    reviewContent: string;
    reviewImages?: string[];
    like: number;
    dislike: number;
  }[]
}
