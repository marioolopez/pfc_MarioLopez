export class Usuarios {
  id_usuario: number;
  nombre: string;
  email: string;
  contraseña:string;
  rol: string;
  constructor(){
    this.id_usuario = 0;
    this.nombre = '';
    this.email = '';
    this.contraseña = '';
    this.rol = '';
  }
}
