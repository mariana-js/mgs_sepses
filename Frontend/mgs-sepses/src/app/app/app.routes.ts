import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../autenticacao/login/login.component';
import { RecuperarSenhaComponent } from '../autenticacao/recuperar-senha/recuperar-senha.component';
import { ListaPacientesComponent } from '../profissionalsaude/lista-pacientes/lista-pacientes.component';
import { ListaUsuariosComponent } from '../profissionaladministrador/lista-usuarios/lista-usuarios.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recuperar-senha', component: RecuperarSenhaComponent},
  {path: 'pacientes', component: ListaPacientesComponent},
  {path: 'usuarios', component: ListaUsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
