import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  constructor(){}

  iniciarSesion(){
    alert(`Login con:\nEmail: ${this.email}\nContraseña: ${this.contrasena}`);
  }

}
