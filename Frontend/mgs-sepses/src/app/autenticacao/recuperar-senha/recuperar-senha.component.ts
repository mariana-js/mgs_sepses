import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';
import { ProfissionalService } from '../../services/profissional.service';
import { ValidationService } from '../../services/validation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Profissional } from '../../models/profissional';

@Component({
  selector: 'app-recuperar-senha',
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.css'
})
export class RecuperarSenhaComponent {
  mensage: string[] = [];
  cpf: string = '';
  senha_anterior: string = '';
  nova_senha: string = '';
  confirmacao_nova_senha: string = '';

  newLog: Log = {
    id_log: '',
    id_profissional: '',
    data: new Date(),
    descricao: ''
  }
  newProfissional: Profissional = {
    id_hospital: '',
    id_profissional: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    estado: '',
    status: false,
    admin: false
  }

  constructor(
    private readonly validation: ValidationService,
    private readonly log: LogService,
    private readonly profisional: ProfissionalService,
    private readonly router: Router
  ) {}

  recuperarSenha(cpf: string, antigaSenha: string, novaSenha: string, confirmacaoNovaSenha: string) {
    const validation = this.validation.validationRecuperarSenha(cpf, antigaSenha, novaSenha, confirmacaoNovaSenha);
    const prof = this.profisional.buscarProfissional(cpf);

    console.log(validation)
    if (validation.length === 0) {
      if (prof) {
        this.newProfissional = { ...prof }; // Atribui uma cópia do objeto Profissional
        this.newProfissional.senha = novaSenha;

        this.profisional.updateProfisssional(this.newProfissional);

        // Adicionando o log ao sistema
        this.log.addlog(this.newLog, prof, 'recuperar-senha', this.newLog.data);

        alert('Senha alterada com sucesso!');

        // Navegar para a rota de acordo com a atuação do usuário
        this.router.navigate([prof.admin ? '/usuarios' : '/pacientes']);
      } else {
        alert('Usuário não encontrado!');
      }

    }

    else {
      this.mensage = this.validation.resposta;
      console.log(this.mensage)
    }

  }

}
