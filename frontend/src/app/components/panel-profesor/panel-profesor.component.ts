import { AsignaturasService } from './../../services/asignaturas.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Examen } from '../../models/examen';
import { ExamenesService } from '../../services/examenes.service';
import { Asignatura } from '../../models/asignatura';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-panel-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-profesor.component.html',
  styleUrls:['./panel-profesor.component.css']
})
export class PanelProfesorComponent implements OnInit{

  public asignaturas: Asignatura[] = [];
  public nuevaAsignatura: Asignatura = new Asignatura();
  public editarAsig: Asignatura | null = null;

  public asignaturaSeleccionada: Asignatura | null = null;

  public examenes: Examen[] = [];
  public nuevoExamen: Examen = new Examen();

  constructor(public usuarioService: UsuariosService, public examenesService: ExamenesService, public asignaturasService: AsignaturasService, private router: Router){}

  ngOnInit():void{
    this.cargarAsignaturas();
  }

  //listar todas
  cargarAsignaturas(){
    this.asignaturasService.obtenerAsignaturas().subscribe((data) =>{
      this.asignaturas = data;
    });
  }

  //crear asignatura con el id del profesor logueado
  crearAsignatura(){
    const usuario = this.usuarioService.usuarioActual;
    if(!usuario){
      alert('no hay usuario logueado');
      return;
    }
    this.nuevaAsignatura.id_usuario = usuario.id_usuario; //id del profesor
    this.asignaturasService.crearAsignatura(this.nuevaAsignatura).subscribe(() =>{
      alert('asignatura creada correctamente');
      this.nuevaAsignatura = new Asignatura();
      this.cargarAsignaturas();
    });
  }

  //editar(mostrar el formulario de edición)
  editarAsignatura(asig: Asignatura){
    this.editarAsig = {...asig};
  }

  //guardar cambios
  guardarCambios(){
    if(this.editarAsig){
      this.asignaturasService.actualizarAsignatura(this.editarAsig.id_asignatura, this.editarAsig).subscribe(() =>{
        alert('asignatura actualizada correctamente');
        this.editarAsig = null;
        this.cargarAsignaturas();
      });
    }
  }

  //eliminar
  eliminarAsignatura(id: number){
    if(confirm('Deseas eliminar esta asignatura?')){
      this.asignaturasService.eliminarAsignatura(id).subscribe(() =>{
        alert('asignatura eliminada correctamente');
        this.cargarAsignaturas();
      });
    }
  }



  //--------------PARTE EXAMEN--------------

  //seleccionar una asignatura para trabajar sus examenes(obtener los examenes de esa asignatura)
  seleccionarAsignatura(asig: Asignatura){
    this.asignaturaSeleccionada = asig;
    this.cargarExamenesDeAsignatura();
  }



  //carga examen de asignatura seleccionada
  private cargarExamenesDeAsignatura(){
    if(!this.asignaturaSeleccionada){
      this.examenes = [];
      return;
    }

    this.examenesService.obtenerExamenes().subscribe((todos) =>{
      this.examenes = todos.filter(
        (e) => e.id_asignatura === this.asignaturaSeleccionada!.id_asignatura
      );
    });
  }



  //crea examen dentro de la asig seleccionada
  crearExamen(){
    const usuario = this.usuarioService.usuarioActual;
    if(!usuario){
      alert("No hay usuario logado");
      return;
    }
    if(!this.asignaturaSeleccionada){
      alert("Selecciona una asignatura");
      return;
    }
    if(!this.nuevoExamen.titulo.trim()){
      alert('Escribe un título');
      return;
    }

    this.nuevoExamen.id_usuario = usuario.id_usuario; //profesor creador
    this.nuevoExamen.id_asignatura = this.asignaturaSeleccionada.id_asignatura;

    this.examenesService.crearExamen(this.nuevoExamen).subscribe(() =>{
      alert("examen creado");
      this.nuevoExamen = new Examen();
      this.cargarExamenesDeAsignatura();
    });
  }


  abrirExamenes(asig: Asignatura) {
    this.asignaturasService.asignaturaSeleccionada = asig; //guardamos la asignatura en el servicio
    this.router.navigate(['/agregarExamen']); //navega al componente
  }

}
