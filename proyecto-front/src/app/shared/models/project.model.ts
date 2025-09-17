export interface Project {
  id: number;
  name: string;
  description: string;
  company: number; //  ID de la compañía (como viene del backend)
  stories?: any[]; // array de historias del backend
}