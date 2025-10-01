import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
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

  constructor(public usuarioService: UsuariosService){}

  iniciarSesion(){
    this.usuarioService.loginUsuario(this.email, this.contrasena).subscribe((res) =>{
      alert("Te has logado correctamente! Bienvenido "+res.usuario.email);
    },
    (err) =>{
      alert("Error. No se reconocen tus datos!");
    });
  }

}
