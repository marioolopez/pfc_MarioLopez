import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../models/resultado';
@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  private url = 'http://localhost:4000/api';
  constructor(private http: HttpClient){}

  //enviar respuestas para corregir examen y guardar nota
  resolverExamen(idExamen: number, idUsuario: number, respuestas: {id_pregunta: number, respuesta_usuario: string}[]): Observable<any>{
    return this.http.post<any>(this.url+'/examenes/'+idExamen+'/resolver', {id_usuario: idUsuario,respuestas});
  }

  //obtener todos los resultados de un alumno
  obtenerResultadosAlumno(idUsuario: number): Observable<Resultado[]>{
    return this.http.get<Resultado[]>(this.url+'/resultados/alumno/'+idUsuario);
  }

}
