import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Log } from '../../models/log';
import { Profissional } from '../../models/profissional';
import { LogService } from '../../services/log.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule,
    HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mensage: string[] = [];
  cpf: string = '';
  senha: string = '';
  usuario: Profissional | undefined;

  newLog: Log = {
    id_log: '',
    idProfissional: '',
    data: new Date(),
    descricao: ''
  }

  constructor(
    private readonly validation: ValidationService,
    private readonly logService: LogService,
    private readonly router: Router
  ) {

  }
  async login(cpf: string, senha: string) {
    cpf = this.cpf;
    senha = this.senha;

    const validation = await this.validation.validationLogin(cpf, senha);
    this.usuario = this.validation.usuario;

    if (validation.length === 0) {
      if (this.usuario) {
        this.addlog()
        this.router.navigate([this.usuario.admin ? '/usuarios' : '/pacientes']);
      }
    } else {
      this.mensage = validation;
    }
  }


  addlog() {
    if (this.usuario) {
      this.newLog.idProfissional = this.usuario.idProfissional;

      this.logService.addlog(this.newLog, this.usuario, 'login', new Date()).subscribe({
        next: ((res) => res),
        error: (err) => {
          console.error('Erro ao registrar log:', err);
        }
      });
    }
  }
  esqueceuSenha() {
    alert('Entre em contato com o administrador do sistema para a alteração da senha.')
  }

}
