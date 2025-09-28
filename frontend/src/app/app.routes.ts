import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registor', component: RegistroComponent},
  {path: '', redirectTo:'/login', pathMatch: 'full'}

];
