export interface User {
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    profile_pic?: string;
    password: string;
    street_address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  }
  

 export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    refresh: string;
    access: string;
    user_id: number;
    user_name: string;
  }
  