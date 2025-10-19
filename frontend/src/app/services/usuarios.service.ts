import { Usuarios } from './../models/usuarios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  Usu: Usuarios;
  Usuarios: Array<Usuarios> = [];
  emailUsuarioLogeado: string;
  usuarioActual: Usuarios | null = null; //(manejar el cerrado de sesion)

  readonly url = "http://localhost:4000/api/usu";
  constructor(private http: HttpClient){
    this.Usu = new Usuarios();
    this.Usuarios = [];
    this.emailUsuarioLogeado = "";
  }

  //registro
  registrarUsuario(usuario: Usuarios): Observable<any>{
    return this.http.post(this.url+'/registro', usuario);
  }

  //login
  loginUsuario(email: string, contrasena:string): Observable<any>{
    return this.http.post(this.url+'/login', {email, contrasena});
  }

  //obtener todos los usuarios
  obtenerUsuarios():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.url);
  }

  //obtener un usuario
  obtenerUsuario(id: number):Observable<Usuarios>{
    return this.http.get<Usuarios>(this.url+'/'+id);
  }

  //actualizar un usuario
  actualizarUsuario(id: number, usuarios: Usuarios):Observable<any>{
    return this.http.put(this.url+'/'+id, usuarios);
  }

  //eliminar un usuario
  eliminarUsuario(id: number){
    return this.http.delete(this.url+'/'+id);
  }

  //cerrarSesion
  logout() {
    this.usuarioActual = null;
    this.emailUsuarioLogeado = "";
  }

}
