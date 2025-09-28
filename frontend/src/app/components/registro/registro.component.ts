import { UsuariosService } from './../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  public nombre: string = '';
  public email: string = '';
  public contrasena: string = '';
  public rol: string = 'alumno'; //por defecto se registran alumnos

  constructor(public UsuariosService: UsuariosService){}

  registrar(){
    alert("Se ha registrado el usuario! (prueba)");
  }

}
