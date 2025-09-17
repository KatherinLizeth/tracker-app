import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../../shared/models/story.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private apiUrl = 'http://localhost:8000/api/stories/';

  constructor(private http: HttpClient) { }

  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.apiUrl}`);
  }

  getStoriesByProject(projectId: number): Observable<Story[]> {
  return this.http.get<Story[]>(`${this.apiUrl}?project=${projectId}`);
}

  createStory(storyData: { title: string; description: string; project: number }): Observable<Story> {
    //  first_ticket 
    const payload = {
      title: storyData.title,
      description: storyData.description,
      project: storyData.project,
      first_ticket: {
        title: `Ticket para: ${storyData.title}`,
        description: `Ticket inicial para la historia: ${storyData.description || 'Sin descripción'}`,
        status: 'ACTIVE'
      }
    };

    console.log('Enviando payload:', payload);
    return this.http.post<Story>(this.apiUrl, payload);
  }
}
