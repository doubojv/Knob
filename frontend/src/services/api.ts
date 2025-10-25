import axios from 'axios';

// Criando uma instância do axios com a URL base
const api = axios.create({
  baseURL: 'http://localhost:3000', // Ajuste para a porta do seu backend NestJS
});

// Interceptor para incluir o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Simple types for user responses from the backend
interface UserDto {
  id_user: number;
  nome: string;
  email: string;
}

export const authService = {
  // Login: POST /users/login -> { user } or { error }
  async login(username: string, password: string): Promise<UserDto> {
    const response = await api.post('/users/login', {
      nome: username,
      senha: password, // backend expects 'senha'
    });
    // backend may return { error: '...' } or { user }
    if (response.data && (response.data as any).error) {
      throw new Error((response.data as any).error);
    }
    return (response.data as any).user;
  },

  // Signup: POST /users -> created user
  async signup(email: string, username: string, password: string): Promise<UserDto> {
    const response = await api.post<UserDto>('/users', {
      email,
      nome: username,
      senha: password,
    });
    return response.data;
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
  },

  // Verifica se está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};