import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public usuarioService: UsuariosService, private routes: Router){}

  cerrarSesion(){
    this.usuarioService.logout();
    alert("Volviendo a la pantalla principal");
    this.routes.navigate(['/']); //vuelve a la pantalla principal
  }

}
