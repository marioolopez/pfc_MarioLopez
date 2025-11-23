export class Resultado {
  id_resultado: number;
  id_examen: number;
  id_usuario: number;
  nota: number;
  fecha_realizacion: Date;
  constructor(){
    this.id_resultado = 0;
    this.id_examen = 0;
    this.id_usuario = 0;
    this.nota = 0;
    this.fecha_realizacion = new Date();
  }
}
