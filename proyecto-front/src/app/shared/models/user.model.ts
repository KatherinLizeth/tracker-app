export interface User {
  id?: number;
  username: string;
  company: number; // ID de la compañía
}

export interface RegisterRequest {
  username: string;
  password: string;
  company: number;
}