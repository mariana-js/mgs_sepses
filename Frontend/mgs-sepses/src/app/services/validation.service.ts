import { Injectable } from '@angular/core';
import { ProfissionalService } from './profissional.service';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {

  cpf: string = '';
  senha: string = '';
  mensagem: string[] = [];
  resposta: string[] = [];

  constructor(private readonly profissional: ProfissionalService) { }


  validationLogin(cpf: string, senha: string): string[] {
    this.mensagem = [];
    // Validação de campos vazios
    if ((cpf.length === 0 || senha.length === 0)) {
      this.mensagem.push('Campo(s) vazio(s).')
    }
    else {
      // Validação de CPF
      this.mensagem = this.validationAuth(cpf, 0, senha);
    }
    this.resposta = this.mensagem;
    return this.resposta;
  }
  validationRecuperarSenha(cpf: string, senha1: string, senha2: string, senha3: string): string[] {
    this.mensagem = [];
    // Validação de campos vazios
    if ((cpf.length === 0 || senha1.length === 0 || senha2.length === 0 || senha3.length === 0)) {
      this.mensagem.push('Campo(s) vazio(s).');
    }
    else if ( senha2 !== senha3) this.mensagem.push('Os campos das senhas precisam ser iguais.');
    // Validação de CPF
    else this.mensagem = this.validationAuth(cpf, 1, senha1);

    this.resposta = this.mensagem;
    return this.resposta;
  }

  validationAuth(cpf: string, op: number, senha: string): string[] {
    if (!this.isValidCPF(cpf)) {
      this.mensagem.push('CPF inválido!');
    }
    else {
      // Se existe o usuário no sistema
      const prof = this.profissional.buscarProfissional(cpf);
      if (prof){
        // Verificando se a senha está correta
        if (op === 1) {
          if (prof?.senha !== senha) this.mensagem.push('Senha antiga incorreta.')
        } else if (op === 0) {
          if (prof?.senha !== senha) this.mensagem.push('Senha incorreta!')
        }
        // Se é administrador ou profissional da saude
        if (prof !== undefined) {
          if (!prof.admin) this.mensagem.push('Problema com o cadastro do usuário no sistema, contacte a administração do sistema!');
        }
      } else {
        this.mensagem.push('Usuário não cadastrado no sistema, contacte a administração do sistema para o cadastro!');
      }

    }
    this.resposta = this.mensagem;
    return this.resposta;
  }

  // Validador do CPF
  isValidCPF(cpf: string): boolean {
    if (typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    const digits = cpf.split('').map(Number);

    const rest = (count: number): number => {
      const sum = digits.slice(0, count - 1)
        .reduce((acc, digit, index) => acc + digit * (count - index), 0);
      return (sum * 10) % 11 % 10;
    };

    return rest(10) === digits[9] && rest(11) === digits[10];
  }


}
