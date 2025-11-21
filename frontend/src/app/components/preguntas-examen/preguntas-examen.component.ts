import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pregunta } from '../../models/pregunta';
import { Examen } from '../../models/examen';
import { Router } from '@angular/router';
import { ExamenesService } from '../../services/examenes.service';
import { PreguntasService } from '../../services/preguntas.service';
@Component({
  selector: 'app-preguntas-examen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preguntas-examen.component.html',
  styleUrl: './preguntas-examen.component.css'
})
export class PreguntasExamenComponent implements OnInit{
  public examenSeleccionado: Examen | null = null;
  public preguntas: Pregunta[] = [];
  public nuevaPregunta: Pregunta = new Pregunta();

  public preguntaEditar: Pregunta | null= null; //editar

  constructor(private router: Router, public examenesService: ExamenesService, public preguntasService: PreguntasService){}

  ngOnInit():void{
    this.examenSeleccionado = this.examenesService.examenSeleccionado;
    if(!this.examenSeleccionado){
      alert('No has seleccionado ningún examen');
      this.router.navigate(['/agregarExamen']);
      return;
    }
    this.cargarPreguntas();
  }

  cargarPreguntas(){
    this.preguntasService.obtenerPreguntasDeExamen(this.examenSeleccionado!.id_examen).subscribe((data) => {
      this.preguntas = data;
    });
  }

  crearPregunta(){
    if(!this.examenSeleccionado) return;
    if(!this.nuevaPregunta.enunciado.trim() || !this.nuevaPregunta.respuesta_correcta){
      alert('Rellena al menos el enunciado y la respuesta correcta');
      return;
    }

    const resp = this.nuevaPregunta.respuesta_correcta.toUpperCase();
    if(!['A', 'B', 'C', 'D'].includes(resp)){
      alert('La respuesta correcta debe ser A, B, C o D majo!');
      return;
    }
    this.nuevaPregunta.respuesta_correcta = resp;

    //la pregunta necesita saber la asignatura (la del examen)
    this.nuevaPregunta.id_asignatura = this.examenSeleccionado.id_asignatura;
    this.preguntasService.crearPreguntaParaExamen(this.examenSeleccionado.id_examen, this.nuevaPregunta).subscribe(() => {
      alert('pregunta creada');
      this.nuevaPregunta = new Pregunta();
      this.cargarPreguntas();
    });
  }

  volver(){
    this.router.navigate(['/agregarExamen']);
  }


  //--------------editar y eliminar-------------------

  empezarEditar(p: Pregunta){
    this.preguntaEditar = {...p};
  }

  guardarEdicion(){
    if(!this.preguntaEditar) return;
    if(!this.preguntaEditar.enunciado.trim() || !this.preguntaEditar.respuesta_correcta.trim()){
      alert('el enunciado y la respuesta correcta es obligatorio!');
      return;
    }

    this.preguntasService.actualizarPregunta(this.preguntaEditar.id_pregunta, this.preguntaEditar).subscribe(() => {
      alert('pregunta actualizada');
      this.preguntaEditar = null;
      this.cargarPreguntas();
    });
  }

  cancelarEdicion(){
    this.preguntaEditar = null;
  }

  eliminarPregunta(id: number){
    if(!confirm('Deseas eliminar esta pregunta?')) return;
    this.preguntasService.eliminarPregunta(id).subscribe(() => {
      alert('pregunta eliminada!');
      this.cargarPreguntas();
    });
  }

}
