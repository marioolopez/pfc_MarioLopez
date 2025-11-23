import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ExamenesService } from '../../services/examenes.service';
import { Examen } from '../../models/examen';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-panel-alumno',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './panel-alumno.component.html',
  styleUrl: './panel-alumno.component.css'
})
export class PanelAlumnoComponent implements OnInit{

  public examenes: Examen[] = [];
  constructor(public examenesService: ExamenesService, private router: Router, public usuarioService: UsuariosService) {}

  ngOnInit(): void {
    const usuario = this.usuarioService.usuarioActual;
    if(!usuario || usuario.rol !== 'alumno'){
      alert('Debes iniciar sesión como alumno');
      this.router.navigate(['/login']);
      return;
    }

    this.examenesService.obtenerExamenes().subscribe((data) =>{
      this.examenes = data;
    });
  }

  hacerExamen(ex: Examen){
    this.router.navigate(['/hacerExamen', ex.id_examen]);
  }

  verResultados(){
    this.router.navigate(['/misResultados']);
  }

}
