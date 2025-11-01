import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Examen } from '../../models/examen';
import { Asignatura } from '../../models/asignatura';
import { ExamenesService } from '../../services/examenes.service';
import { AsignaturasService } from '../../services/asignaturas.service';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-agregar-examen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-examen.component.html',
  styleUrls: ['./agregar-examen.component.css']
})
export class AgregarExamenComponent implements OnInit{

  asignaturaSeleccionada: Asignatura | null = null;
  examenes: Examen[] = [];
  nuevoExamen: Examen = new Examen();

  constructor(private router: Router, public examenesService: ExamenesService, public asignaturasService: AsignaturasService, public usuarioService: UsuariosService){}

  ngOnInit(): void {
    this.asignaturaSeleccionada = this.asignaturasService.asignaturaSeleccionada;
    if(!this.asignaturaSeleccionada){
      alert('No se ha seleccionado ninguna asignatura.');
      this.router.navigate(['/panelProfesor']);
      return;
    }
    this.cargarExamenes();
  }

  cargarExamenes() {
    this.examenesService.obtenerExamenes().subscribe((todos) => {
      this.examenes = todos.filter((e) =>
        e.id_asignatura === this.asignaturaSeleccionada!.id_asignatura
      );
    });
  }

  crearExamen() {
    const usuario = this.usuarioService.usuarioActual;
    if(!usuario) {
      alert('No hay usuario logueado');
      return;
    }
    if(!this.nuevoExamen.titulo.trim()) {
      alert('Escribe un título');
      return;
    }

    this.nuevoExamen.id_usuario = usuario.id_usuario;
    this.nuevoExamen.id_asignatura = this.asignaturaSeleccionada!.id_asignatura;

    this.examenesService.crearExamen(this.nuevoExamen).subscribe(() => {
      alert('Examen creado correctamente');
      this.nuevoExamen = new Examen();
      this.cargarExamenes();
    });
  }


  volver() {
    this.router.navigate(['/panelProfesor']);
  }


}

