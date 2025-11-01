import { Asignatura } from './../models/asignatura';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {
  readonly url = 'http://localhost:4000/api/asignaturas';
  Asig: Asignatura;
  Asignaturas: Array<Asignatura>;
  asignaturaSeleccionada: Asignatura | null = null;

  constructor(private http: HttpClient) {
    this.Asig = new Asignatura();
    this.Asignaturas = [];
  }

  crearAsignatura(asig: Asignatura): Observable<any> {
    return this.http.post(this.url, asig);
  }

  obtenerAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.url);
  }

  obtenerAsignatura(id: number): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.url}/${id}`);
  }

  actualizarAsignatura(id: number, asig: Asignatura): Observable<any> {
    return this.http.put(`${this.url}/${id}`, asig);
  }

  eliminarAsignatura(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
