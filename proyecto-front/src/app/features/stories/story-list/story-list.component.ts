import { Component, Input, OnInit } from '@angular/core';
import { StoryService } from '../../../core/services/story.service';
import { Story } from '../../../shared/models/story.model';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  @Input() projectId!: number;
  stories: Story[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';

  // Campos del formulario
  newTitle = '';
  newDescription = '';
  isCreating = false;

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.loadStories();
  }

  loadStories(): void {
    this.loading = true;
    this.storyService.getStoriesByProject(this.projectId).subscribe({
      next: (data) => {
        this.stories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando historias:', err);
        this.errorMessage = 'Error al cargar las historias';
        this.loading = false;
      }
    });
  }

 createStory(): void {
    if (!this.newTitle.trim()) {
      this.errorMessage = 'Por favor, ingresa un título para la historia';
      return;
    }

    this.isCreating = true;
    this.errorMessage = '';
    this.successMessage = '';

    const storyData = {
      title: this.newTitle.trim(),
      description: this.newDescription.trim(),
      project: this.projectId
    };

    console.log('Creando historia:', storyData);

    this.storyService.createStory(storyData).subscribe({
      next: (story: Story) => {
        console.log('Historia creada exitosamente:', story);
        this.stories.push(story);
        this.newTitle = '';
        this.newDescription = '';
        this.successMessage = 'Historia creada exitosamente';
        this.isCreating = false;
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error completo al crear historia:', err);
        
        if (err.error) {
          console.error('Detalles del error del servidor:', err.error);
          
          // Mostrar mensajes específicos del backend
          if (err.error.first_ticket) {
            this.errorMessage = `Error en ticket: ${Array.isArray(err.error.first_ticket) ? err.error.first_ticket.join(', ') : err.error.first_ticket}`;
          } else if (err.error.non_field_errors) {
            this.errorMessage = Array.isArray(err.error.non_field_errors) ? err.error.non_field_errors.join(', ') : err.error.non_field_errors;
          } else if (err.error.detail) {
            this.errorMessage = err.error.detail;
          } else {
            this.errorMessage = 'Error del servidor al crear la historia';
          }
        } else {
          this.errorMessage = 'Error de conexión. Verifica que el servidor esté funcionando.';
        }
        
        this.isCreating = false;
      }
    });
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}