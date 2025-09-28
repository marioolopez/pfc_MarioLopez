export class Usuarios {
  id_usuario: number;
  nombre: string;
  email: string;
  contrasena:string;
  rol: string;
  constructor(){
    this.id_usuario = 0;
    this.nombre = '';
    this.email = '';
    this.contrasena = '';
    this.rol = '';
  }
}
