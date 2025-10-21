export class Pregunta {
  id_pregunta: number;
  enunciado: string;
  opcionA: string;
  opcionB: string;
  opcionC: string;
  opcionD: string;
  respuesta_correcta: string;
  id_asignatura: number;

  constructor() {
    this.id_pregunta = 0;
    this.enunciado = '';
    this.opcionA = '';
    this.opcionB = '';
    this.opcionC = '';
    this.opcionD = '';
    this.respuesta_correcta = '';
    this.id_asignatura = 0;
  }
}
