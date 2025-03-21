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
  styleUrls: ['./recuperar-senha.component.css', '/src/app/autenticacao/autenticacao.css']
})
export class RecuperarSenhaComponent {
  mensage: string[] = [];
  cpf: string = '';
  senha_anterior: string = '';
  nova_senha: string = '';
  confirmacao_nova_senha: string = '';
  usuario: Profissional | undefined;

  logs: Log[] = [];
  profissionais: Profissional[] = [];

  newLog: Log = {
    id_log: '',
    idProfissional: '',
    data: new Date(),
    descricao: ''
  }
  newProfissional: Profissional = {
    id_hospital: '',
    idProfissional: '',
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
    private readonly logService: LogService,
    private readonly profisional: ProfissionalService,
    private readonly router: Router
  ) { }

  async recuperarSenha(cpf: string, antigaSenha: string, novaSenha: string, confirmacaoNovaSenha: string) {
    cpf = this.cpf;
    antigaSenha = this.senha_anterior;
    novaSenha = this.nova_senha;
    confirmacaoNovaSenha = this.confirmacao_nova_senha;
    const validation = await this.validation.validationRecuperarSenha(cpf, antigaSenha, novaSenha, confirmacaoNovaSenha);
    this.usuario = this.validation.usuario;
    if (validation.length === 0) {
      if (this.usuario) {
        this.newProfissional = this.usuario;
        this.newProfissional.senha = novaSenha;
        try {
          if (this.newProfissional !== undefined) {
           this.addlog();
            await this.profisional.updateProfissional(this.newProfissional).toPromise();
          }
          alert('Senha alterada com sucesso!');
          this.router.navigate([this.usuario.admin ? '/usuarios' : '/pacientes']);
        } catch (error) {
          console.error("Erro ao atualizar senha: ", error);
          alert('Erro ao atualizar senha, tente novamente.');
        }
      } else alert('Usuário não encontrado!');
    } else this.mensage = this.validation.resposta;
  }
  addlog() {
    if (this.usuario) {
      this.newLog.idProfissional = this.usuario.idProfissional;
      this.logService.addlog(this.newLog, this.usuario, 'recuperar-senha', new Date()).subscribe({
        next: ((res) => res),
        error: (err) => {
          console.error('Erro ao registrar log:', err);
        }
      });
    }
  }
}
