import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Examen } from '../../models/examen';
import { Pregunta } from '../../models/pregunta';
import { ExamenesService } from '../../services/examenes.service';
import { PreguntasService } from '../../services/preguntas.service';

@Component({
  selector: 'app-panel-profesor',
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-profesor.component.html',
  styleUrl: './panel-profesor.component.css'
})
export class PanelProfesorComponent implements OnInit{
  public examenes: Examen[] = [];
  public preguntas: Pregunta[] = [];

  public nuevoExamen: Examen = new Examen();
  public nuevaPregunta: Pregunta = new Pregunta();

  constructor(public examenesService: ExamenesService, public preguntasService: PreguntasService){}

  ngOnInit(): void {

  }

  cargarExamenes() {
    this.examenesService.obtenerExamenes().subscribe({
      next: (data) => this.examenes = data,
      error: (err) => console.error('Error cargando examenes:', err)
    });
  }

  cargarPreguntas() {
    this.preguntasService.obtenerPreguntas().subscribe({
      next: (data) => this.preguntas = data,
      error: (err) => console.error('Error cargando preguntas:', err)
    });
  }

  crearExamen() {
    this.nuevoExamen.id_asignatura = 1; // por ahora una asignatura fija
    this.nuevoExamen.id_usuario = 2; // profesor de prueba

    this.examenesService.crearExamen(this.nuevoExamen).subscribe({
      next: () => {
        alert('Examen creado correctamente');
        this.nuevoExamen = new Examen();
        this.cargarExamenes();
      },
      error: (err) => console.error('Error al crear examen:', err)
    });
  }

  crearPregunta() {
    this.nuevaPregunta.id_asignatura = 1;

    this.preguntasService.crearPregunta(this.nuevaPregunta).subscribe({
      next: () => {
        alert('Pregunta creada correctamente');
        this.nuevaPregunta = new Pregunta();
        this.cargarPreguntas();
      },
      error: (err) => console.error('Error al crear pregunta:', err)
    });
  }

}
