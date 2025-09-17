export interface Company {
  id: number;
  name: string;
  nit: string;
  phone: string;
  address: string;
  email: string;
  projects?: any[]; //  array de proyectos del backend
}