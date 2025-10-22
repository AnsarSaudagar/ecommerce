export interface AddressModel {
  id: number;
  first_name: string;
  last_name: string;
  user_id: number;
  address: string;
  city: string;
  pincode: number;
  phone_number?: number;
  is_default: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}
