import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { PanelProfesorComponent } from './components/panel-profesor/panel-profesor.component';
import { AgregarExamenComponent } from './components/agregar-examen/agregar-examen.component';
import { PreguntasExamenComponent } from './components/preguntas-examen/preguntas-examen.component';
import { PanelAlumnoComponent } from './components/panel-alumno/panel-alumno.component';
import { HacerExamenComponent } from './components/hacer-examen/hacer-examen.component';
import { MisResultadosComponent } from './components/mis-resultados/mis-resultados.component';
export const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegistroComponent },
  {path: 'info', component: InfoComponent},
  {path: 'panelAdmin', component: PanelAdminComponent},
  {path: 'crear', component: AgregarUsuarioComponent},
  {path: 'panelProfesor', component: PanelProfesorComponent},
  {path: 'agregarExamen', component: AgregarExamenComponent },
  {path: 'preguntasExamen', component:  PreguntasExamenComponent},
  {path: 'panelAlumno', component: PanelAlumnoComponent },
  {path: 'hacerExamen/:id', component: HacerExamenComponent },
  {path: 'misResultados', component:  MisResultadosComponent},
  {path: '**', redirectTo: ''} //redirigo al home si la ruta no existe
];
