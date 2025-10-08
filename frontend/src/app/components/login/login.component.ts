import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {
  public email: string = "";
  public contrasena: string = "";

  constructor(public usuarioService: UsuariosService, private router: Router){}

  iniciarSesion(){
    this.usuarioService.loginUsuario(this.email, this.contrasena).subscribe((res) =>{
      const usuario = res.usuario;
      this.usuarioService.usuarioActual = usuario; //guardo el usu
      alert("Te has logado correctamente! Bienvenido "+res.usuario.email);

      if(usuario.rol === 'admin') {
        this.router.navigate(['/panelAdmin']); //para el panelAdmin
      }else if (usuario.rol === 'profesor') {
        this.router.navigate(['/']); //para el profesor
      }else if(usuario.rol === 'alumno'){
        this.router.navigate(['/']); //para el alumno
      }

    },
    (err) =>{
      alert("Error. No se reconocen tus datos!");
    });
  }

}
