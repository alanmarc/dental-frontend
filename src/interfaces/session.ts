export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface responseError {}
