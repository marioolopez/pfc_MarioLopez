import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private url = 'http://localhost:4000/api/preguntas';
  constructor(private http: HttpClient){}

  obtenerPreguntas(): Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(this.url);
  }

  //preguntas de un examen
  obtenerPreguntasDeExamen(idExamen: number): Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(this.url+'/examen/'+idExamen);
  }

  //crear pregunta para un examen concreto
  crearPreguntaParaExamen(idExamen: number, pregunta: Pregunta): Observable<Pregunta>{
    return this.http.post<Pregunta>(this.url+'/examen/'+idExamen, pregunta);
  }

  obtenerPregunta(id: number): Observable<Pregunta>{
    return this.http.get<Pregunta>(this.url+'/'+id);
  }

  //actualizo pregunta
  actualizarPregunta(id: number, pregunta: Pregunta): Observable<any>{
    return this.http.put(this.url+'/'+id, pregunta);
  }

  //elimino pregunta
  eliminarPregunta(id: number): Observable<any>{
    return this.http.delete(this.url+'/'+id);
  }

}
