export class Asignatura {
  id_asignatura: number;
  nombre: string;
  descripcion: string;
  id_usuario: number; //el profesor que la creó
  constructor(){
    this.id_asignatura = 0;
    this.nombre = '';
    this.descripcion = '';
    this.id_usuario = 0;
  }
}
