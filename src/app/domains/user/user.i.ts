import dayjs from 'dayjs';

export interface IUserInfo {
  id: number;
  internal_id: string | number;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar: string;
  email: string;
  gender: string;
  birthday: string | number | Date | dayjs.Dayjs;
  phone: number;
  address: string;
  email_verified_at: string;
  platform: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  name: string;
  setting?: number[];
  settings?: { user_long_time?: number; ready_time_appointment?: number };
}

export interface IJWT {
  token: string;
  token_type: string;
  time_expire: string;
  refresh_token: string;
  time_expire_refresh_token: string;
}
