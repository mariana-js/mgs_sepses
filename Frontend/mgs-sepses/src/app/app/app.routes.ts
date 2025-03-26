import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../autenticacao/login/login.component';
import { RecuperarSenhaComponent } from '../autenticacao/recuperar-senha/recuperar-senha.component';
import { GerenciarHospitalComponent } from '../profissionaladministrador/gerenciar-hospital/gerenciar-hospital.component';
import { GerenciarUsuarioComponent } from '../profissionaladministrador/gerenciar-usuario/gerenciar-usuario.component';
import { ListaHospitaisComponent } from '../profissionaladministrador/lista-hospitais/lista-hospitais.component';
import { ListaLogsComponent } from '../profissionaladministrador/lista-logs/lista-logs.component';
import { ListaUsuariosComponent } from '../profissionaladministrador/lista-usuarios/lista-usuarios.component';
import { LogDescricaoComponent } from '../profissionaladministrador/log-descricao/log-descricao.component';
import { OutrasOpcoesComponent } from '../profissionaladministrador/outras-opcoes/outras-opcoes.component';
import { ListaPacientesComponent } from '../profissionalsaude/lista-pacientes/lista-pacientes.component';
import { PacienteComponent } from '../profissionalsaude/paciente/paciente.component';
import { GerenciarDadosClinicosComponent } from '../profissionalsaude/gerenciar-dados-clinicos/gerenciar-dados-clinicos.component';
import { GerenciarSituacaoAdversaComponent } from '../profissionalsaude/gerenciar-situacao-adversa/gerenciar-situacao-adversa.component';
import { GerenciarPacienteComponent } from '../profissionalsaude/gerenciar-paciente/gerenciar-paciente.component';

export const routes: Routes = [
  // Autenticacao
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  // Profissional da Saude
  { path: 'pacientes', component: ListaPacientesComponent },
  { path: 'paciente', component: PacienteComponent },
  { path: 'paciente/:id', component: PacienteComponent },
  { path: 'gerenciar-paciente', component: GerenciarPacienteComponent },
  { path: 'gerenciar-paciente/:id', component: GerenciarPacienteComponent },
  { path: 'dados-clinicos', component: GerenciarDadosClinicosComponent },
  { path: 'dados-clinicos/:id', component: GerenciarDadosClinicosComponent },
  { path: 'situacao-adversa', component: GerenciarSituacaoAdversaComponent },
  { path: 'situacao-adversa/:id', component: GerenciarSituacaoAdversaComponent },
  // Profissional Administrador
  { path: 'usuarios', component: ListaUsuariosComponent },
  { path: 'gerenciar-usuario', component: GerenciarUsuarioComponent },
  { path: 'gerenciar-usuario/:id', component: GerenciarUsuarioComponent },
  { path: 'hospitais', component: ListaHospitaisComponent },
  { path: 'gerenciar-hospital', component: GerenciarHospitalComponent },
  { path: 'gerenciar-hospital/:id', component: GerenciarHospitalComponent },
  { path: 'lista-logs', component: ListaLogsComponent },
  { path: 'log/:id', component: LogDescricaoComponent },
  { path: 'outras-opcoes', component: OutrasOpcoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
