import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LogService } from '../../services/log.service';
import { ProfissionalService } from '../../services/profissional.service';
import { ValidationService } from '../../services/validation.service';
import { Log } from '../../models/log';

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

  newLog: Log = {
    id_log: '',
    id_profissional: '',
    data: new Date(),
    descricao: ''
  }

  constructor(
    private readonly validation: ValidationService,
    private readonly log: LogService,
    private readonly profisional: ProfissionalService,
    private readonly router: Router
  ) {

  }
  login(cpf: string, senha: string) {

    cpf = this.cpf;
    senha = this.senha;
    const validation = this.validation.validationLogin(cpf, senha);
    const prof = this.profisional.buscarProfissional(cpf);

    if (validation.length === 0) {

        // Adicionando o log ao sistema
        if (prof !== undefined) {
          this.log.addlog(this.newLog, prof, 'login', this.newLog.data);

          // navegar para a rota de acordo com a atuacao do usuario
          this.router.navigate([prof.admin ? '/usuarios' : '/pacientes']);
        }

    }

    else {
      this.mensage = this.validation.resposta;
      console.log(this.mensage)
    }

  }

  esqueceuSenha() {
    alert('Entre em contato com o administrador do sistema para a alteração da senha.')
  }

}
