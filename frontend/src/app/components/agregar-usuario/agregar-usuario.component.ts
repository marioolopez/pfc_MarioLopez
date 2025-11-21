import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../models/usuarios';
@Component({
  selector: 'app-agregar-usuario',
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css'
})
export class AgregarUsuarioComponent {

  public usuarioNuevo: Usuarios = new Usuarios();
  constructor(public usuarioService: UsuariosService, public rutadevuelta: Router){}

  crearUsuario(){
    if(!this.usuarioNuevo.nombre || !this.usuarioNuevo.email || !this.usuarioNuevo.contrasena || !this.usuarioNuevo.rol){
      alert("Por favor, completa todos los campos.");
      return;
    }

    this.usuarioService.registrarUsuario(this.usuarioNuevo).subscribe(() =>{
      alert("Usuario creado correctamente");
      this.rutadevuelta.navigate(['/panelAdmin']);
    });
  }

  cancelar(){
    this.rutadevuelta.navigate(['/panelAdmin']);
  }

}
