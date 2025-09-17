export interface Story {
   id: number;
  title: string;
  description?: string;
  project: number; // id del proyecto al que pertenece
}