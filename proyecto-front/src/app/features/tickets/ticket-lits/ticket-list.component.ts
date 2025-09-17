import { Component, Input, OnInit } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../../shared/models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  @Input() storyId!: number;

  tickets: Ticket[] = [];
  loading = true;

  // Formulario de creación
  newTitle = '';
  newDescription = '';
  newComments = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  // === Cargar tickets ===
  loadTickets(): void {
    this.loading = true;
    this.ticketService.getTicketsByStory(this.storyId).subscribe({
      next: (data) => {
        this.tickets = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando tickets:', error);
        this.loading = false;
      }
    });
  }

  // === Crear un nuevo ticket ===
  createTicket(): void {
    if (!this.newTitle.trim() || !this.newDescription.trim()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const ticketData: Partial<Ticket> = {
      title: this.newTitle.trim(),
      description: this.newDescription.trim(),
      comments: this.newComments.trim(),
      story: this.storyId,
      status: 'ACTIVE'
    };

    this.ticketService.createTicket(ticketData).subscribe({
      next: () => {
        alert('Ticket creado con éxito');
        this.newTitle = '';
        this.newDescription = '';
        this.newComments = '';
        this.loadTickets(); // recargar la lista
      },
      error: (error) => {
        console.error('Error creando ticket:', error);
        alert('Hubo un error al crear el ticket');
      }
    });
  }

  // === Actualizar estado del ticket ===
  updateTicketStatus(ticket: Ticket, newStatus: 'ACTIVE' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'): void {
  this.ticketService.updateTicket(ticket.id, { status: newStatus }).subscribe({
    next: (updatedTicket) => {
      // estado del ticket en memoria
      ticket.status = updatedTicket.status;
      alert('Estado actualizado correctamente');
    },
    error: (err) => {
      console.error('Error actualizando estado:', err);
      alert('Error al actualizar el estado');
    }
  });
}
  // === Eliminar ticket ===
  deleteTicket(ticket: Ticket): void {
    if (confirm(`¿Seguro que quieres eliminar el ticket: ${ticket.title}?`)) {
      this.ticketService.deleteTicket(ticket.id).subscribe({
        next: () => {
          this.tickets = this.tickets.filter(t => t.id !== ticket.id);
          alert('Ticket eliminado con éxito');
        },
        error: (err) => console.error('Error eliminando ticket:', err)
      });
    }
  }

  // === Cancelar ticket ===
  cancelTicket(id: number): void {
    if (!confirm('¿Estás seguro de cancelar este ticket?')) return;

    this.ticketService.cancelTicket(id).subscribe({
      next: () => {
        alert('Ticket cancelado');
        this.loadTickets();
      },
      error: (error) => {
        console.error('Error cancelando ticket:', error);
        alert('No se pudo cancelar el ticket');
      }
    });
  }
}