import { UsuariosService } from './../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuarios } from '../../models/usuarios';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public usuario: Usuarios = new Usuarios(); //nuevo usuario

  constructor(public usuarioService: UsuariosService){}

  registrar(f: NgForm){
    if(f.invalid){
    alert("faltan datos antes de iniciar!!");
    return;
    }
    this.usuario.rol = 'alumno';
    this.usuarioService.registrarUsuario(this.usuario).subscribe((res) =>{
      alert("Se ha registrado el usuario!");
      f.reset();//limpio formulario
    },(err) =>{
      alert("error al registrar el usuario!");
    });
  }

}
