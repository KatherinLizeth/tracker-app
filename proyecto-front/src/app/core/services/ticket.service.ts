import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../../shared/models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8000/api/tickets/';

  constructor(private http: HttpClient) {}

  // Listar tickets por historia
  getTicketsByStory(storyId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}?story=${storyId}`);
  }

  // Crear ticket
  createTicket(ticket: Partial<Ticket>): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  // Editar ticket
  updateTicket(id: number, data: Partial<Ticket>): Observable<Ticket> {
  return this.http.patch<Ticket>(`${this.apiUrl}${id}/`, data);
}

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

  // Cancelar ticket (cambiar estado a CANCELLED)
  cancelTicket(id: number): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.apiUrl}${id}/`, { status: 'CANCELLED' });
  }
}