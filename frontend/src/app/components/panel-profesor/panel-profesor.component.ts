import { AsignaturasService } from './../../services/asignaturas.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Examen } from '../../models/examen';
import { Pregunta } from '../../models/pregunta';
import { ExamenesService } from '../../services/examenes.service';
import { PreguntasService } from '../../services/preguntas.service';
import { Asignatura } from '../../models/asignatura';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-panel-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-profesor.component.html',
  styleUrl: './panel-profesor.component.css'
})
export class PanelProfesorComponent implements OnInit{
  public examenes: Examen[] = [];
  public preguntas: Pregunta[] = [];
  public asignaturas: Asignatura[] = [];

  public nuevoExamen: Examen = new Examen();
  public nuevaPregunta: Pregunta = new Pregunta();
  public nuevaAsignatura: Asignatura = new Asignatura();

  public editarAsig: Asignatura | null = null;

  constructor(public usuarioService: UsuariosService, public examenesService: ExamenesService, public preguntasService: PreguntasService, public asignaturasService: AsignaturasService){}

  ngOnInit():void {
    this.cargarAsignaturas();
  }

  //listar todas
  cargarAsignaturas() {
    this.asignaturasService.obtenerAsignaturas().subscribe((data) => {
      this.asignaturas = data;
    });
  }

  //crear asignatura con el id del profesor logueado
  crearAsignatura() {
    const usuario = this.usuarioService.usuarioActual;
    if (!usuario) {
      alert('Error: no hay usuario logueado.');
      return;
    }

    this.nuevaAsignatura.id_usuario = usuario.id_usuario; //id del profesor

    this.asignaturasService.crearAsignatura(this.nuevaAsignatura).subscribe(() => {
      alert('asignatura creada correctamente');
      this.nuevaAsignatura = new Asignatura();
      this.cargarAsignaturas();
    });
  }

  //editar(mostrar el formulario de edición)
  editarAsignatura(asig: Asignatura) {
    this.editarAsig = { ...asig };
  }

  //guardar cambios
  guardarCambios() {
    if (this.editarAsig) {
      this.asignaturasService.actualizarAsignatura(this.editarAsig.id_asignatura, this.editarAsig).subscribe(() => {
        alert('Asignatura actualizada correctamente');
        this.editarAsig = null;
        this.cargarAsignaturas();
      });
    }
  }

  //eliminar
  eliminarAsignatura(id: number) {
    if (confirm('¿Deseas eliminar esta asignatura?')) {
      this.asignaturasService.eliminarAsignatura(id).subscribe(() => {
        alert('Asignatura eliminada correctamente');
        this.cargarAsignaturas();
      });
    }
  }

}
