import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Examen } from '../models/examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

  private apiUrl = 'http://localhost:4000/api/examenes';

  constructor(private http: HttpClient) { }

  obtenerExamenes(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.apiUrl);
  }

  crearExamen(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.apiUrl, examen);
  }
}
