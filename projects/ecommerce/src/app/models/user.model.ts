export interface UserModel {
  id: number;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email: string;
  email_verified_at?: Date | null;
  password: string;
  api_token?: string | null;
  remember_token?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
