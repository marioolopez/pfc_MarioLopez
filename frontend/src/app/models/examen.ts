export class Examen {
  id_examen: number;
  titulo: string;
  fechaCreacion: Date;
  id_asignatura: number;
  id_usuario: number;

  constructor() {
    this.id_examen = 0;
    this.titulo = '';
    this.fechaCreacion = new Date();
    this.id_asignatura = 0;
    this.id_usuario = 0;
  }
}
