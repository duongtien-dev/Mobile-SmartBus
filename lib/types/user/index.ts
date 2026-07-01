export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
  role: 'admin' | 'student' | 'instructor';
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  loading: boolean;
}
