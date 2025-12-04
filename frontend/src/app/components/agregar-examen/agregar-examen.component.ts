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

  public asignaturaSeleccionada: Asignatura | null = null; //para seleccionar la asignatura
  public examenes: Examen[] = []; //para cargar los examenes
  public nuevoExamen: Examen = new Examen(); //para crear un nuevo examen

  public examenEditar: Examen | null = null; //para editar

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

  cargarExamenes(){
    this.examenesService.obtenerExamenes().subscribe((todos) =>{
      this.examenes = todos.filter((e) =>
        e.id_asignatura === this.asignaturaSeleccionada!.id_asignatura
      );
    });
  }

  crearExamen(){
    const usuario = this.usuarioService.usuarioActual;
    if(!usuario){
      alert('No hay usuario logueado');
      return;
    }
    if(!this.nuevoExamen.titulo.trim()){
      alert('Escribe un título');
      return;
    }

    this.nuevoExamen.id_usuario = usuario.id_usuario;
    this.nuevoExamen.id_asignatura = this.asignaturaSeleccionada!.id_asignatura;
    this.examenesService.crearExamen(this.nuevoExamen).subscribe(() =>{
      alert('Examen creado correctamente');
      this.nuevoExamen = new Examen();
      this.cargarExamenes();
    });
  }

  //------------------------------


  empezarEditar(ex: Examen){
    this.examenEditar = {...ex}; //copia
  }


  guardarEdicion(){
    if(!this.examenEditar) return;
    if(!this.examenEditar.titulo.trim()){
      alert('el título no puede estar vacio');
      return;
    }

    this.examenesService.actualizarExamen(this.examenEditar.id_examen, this.examenEditar).subscribe(() =>{
      alert('examen actualizado correctamente');
      this.examenEditar = null;
      this.cargarExamenes();
    });
  }


  cancelarEdicion(){
    this.examenEditar = null;
  }


  eliminarExamen(id: number){
    if(!confirm('¿deseas eliminar este examen?')) return;
    this.examenesService.eliminarExamen(id).subscribe(() => {
      alert('Examen eliminado correctamente');
      this.cargarExamenes();
    });
  }


  volver(){
    this.router.navigate(['/panelProfesor']);
  }

  abrirPreguntas(ex: Examen){
    this.examenesService.examenSeleccionado = ex;
    this.router.navigate(['/preguntasExamen']);
  }

}
