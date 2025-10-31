export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export interface RegisterState {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmedPassword?: string[];
  };
  message?: string | null;
}
