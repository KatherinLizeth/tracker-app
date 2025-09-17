export interface Ticket {
  id: number;
  title: string;
  description: string;
  comments: string;
  status: 'ACTIVE' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
  story: number; // ID de la historia a la que pertenece
  assigned_to?: number | null; // Opcional: usuario asignado
}