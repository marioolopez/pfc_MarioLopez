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

  crearExamen(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.apiUrl, examen);
  }

  obtenerExamenes(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.apiUrl);
  }

  obtenerExamen(id: number): Observable<Examen> {
    return this.http.get<Examen>(this.apiUrl+'/'+id);
  }

  actualizarExamen(id: number, examen: Examen): Observable<any> {
    return this.http.put(this.apiUrl+'/'+id, examen);
  }

  eliminarExamen(id: number){
    return this.http.delete(this.apiUrl+'/'+id);
  }
}
