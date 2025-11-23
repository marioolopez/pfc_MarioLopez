import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosService } from '../../services/resultados.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Resultado } from '../../models/resultado';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-resultados.component.html',
  styleUrl: './mis-resultados.component.css'
})
export class MisResultadosComponent implements OnInit{

  public resultados: any[] = [];

  constructor(public resultadosService: ResultadosService,public usuarioService: UsuariosService,private router: Router){}

  ngOnInit(): void {
    const usuario = this.usuarioService.usuarioActual;
    if(!usuario) return;
    this.resultadosService.obtenerResultadosAlumno(usuario.id_usuario).subscribe((data) => {
        this.resultados = data;
    });
  }

  cancelar() {
    this.router.navigate(['/panelAlumno']);
  }

}
