import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PreguntasService } from '../../services/preguntas.service';
import { ResultadosService } from '../../services/resultados.service';
import { Pregunta } from '../../models/pregunta';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-hacer-examen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hacer-examen.component.html',
  styleUrl: './hacer-examen.component.css'
})
export class HacerExamenComponent implements OnInit{
  public examenId!: number;
  public preguntas: Pregunta[] = [];
  public respuestas: {[id_pregunta: number]: string } = {};
  public nota: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private preguntasService: PreguntasService, public  resultadosService: ResultadosService, public usuarioService: UsuariosService) {}

  ngOnInit(): void{
    this.examenId = Number(this.route.snapshot.paramMap.get('id')); //coger id del examen y cargar preguntas
    const usuario = this.usuarioService.usuarioActual;
    if(!usuario || usuario.rol !== 'alumno'){
      alert('Debes iniciar sesión como alumno');
      this.router.navigate(['/login']);
      return;
    }

    this.preguntasService.obtenerPreguntasDeExamen(this.examenId).subscribe((data) =>{
      this.preguntas = data;
    });
  }

  enviarExamen(){
    const usuario=this.usuarioService.usuarioActual;
    if(!usuario){
      alert('Debes iniciar sesión');
      this.router.navigate(['/login']);
      return;
    }

    //recorre preguntas, coge respuesta marcada por user, lo pongo en mayus, creo un array ordenado y lo mando al backend para correguir (fácil)
    const respuestasArray =this.preguntas.map(p => ({
      id_pregunta: p.id_pregunta,
      respuesta_usuario: (this.respuestas[p.id_pregunta] || '').toUpperCase()
    }));

    this.resultadosService.resolverExamen(this.examenId,usuario.id_usuario,respuestasArray).subscribe((res) => {
      this.nota =res.nota;
      alert(`Examen enviado.Nota: ${res.nota.toFixed(2)}/10`);
      this.router.navigate(['/misResultados']);
    });
  }

  cancelar(){
    this.router.navigate(['/panelAlumno']);
  }

}
