import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../models/usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css'
})
export class PanelAdminComponent implements OnInit{
  public usuarios: Usuarios[] = [];
  public usuarioNuevo: Usuarios = new Usuarios();
  public editarUsu: Usuarios|null = null; //para editar

  constructor(public usuarioService:UsuariosService, public rutaproducto: Router){}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  //bien
  cargarUsuarios(){
    this.usuarioService.obtenerUsuarios().subscribe((todosUsus) =>{
      this.usuarios = todosUsus;
    });
  }


  //bien (crear usuario)
  crearUsuario(){
    this.usuarioService.registrarUsuario(this.usuarioNuevo).subscribe(() => {
      alert("Usuario creado correctamente");
      this.usuarioNuevo = new Usuarios();
      this.cargarUsuarios();
    });
  }


  //bien (editar usuario)
  editarUsuario(usuario: Usuarios) {
    this.editarUsu = { ...usuario }; //copia del usuario
  }

  //guardar cambios despues de la edición
  guardarCambios() {
    if(this.editarUsu){
      this.usuarioService.actualizarUsuario(this.editarUsu.id_usuario, this.editarUsu).subscribe(() => {
        alert("Usuario actualizado correctamente");
        this.editarUsu = null;
        this.cargarUsuarios();
      });
    }
  }


  //bien (eliminar usuario)
  eliminarUsuario(id: number) {
    if (confirm("¿Deseas eliminar este usuario?")) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => {
        alert("Usuario eliminado correctamente");
        this.cargarUsuarios();
      });
    }
  }

  irACrearUsuario() {
    this.rutaproducto.navigate(['/crear']);
  }

}
