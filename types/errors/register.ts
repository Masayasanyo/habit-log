export interface RegisterState {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmedPassword?: string[];
  };
  message?: string | null;
}
