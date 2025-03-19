import { Injectable } from '@angular/core';
import { ProfissionalService } from './profissional.service';
import { Profissional } from '../models/profissional';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {

  cpf: string = '';
  senha: string = '';
  mensagem: string[] = [];
  resposta: string[] = [];
  usuario: Profissional | undefined;

  constructor(private readonly profissional: ProfissionalService) { }


  async validationLogin(cpf: string, senha: string): Promise<string[]> {
    this.mensagem = [];
    if (!cpf || !senha) this.mensagem.push('Campo(s) vazio(s).');
    else if (!this.isValidCPF(cpf)) this.mensagem.push('CPF inválido!');
    else {
      const authMessages = await this.validationAuth(cpf, 0, senha);
      this.mensagem = [...authMessages];
    }

    this.resposta = [...this.mensagem];
    return this.resposta;
  }


  async validationRecuperarSenha(cpf: string, senha1: string, senha2: string, senha3: string): Promise<string[]> {
    this.mensagem = [];
    if ((!cpf || !senha1 || !senha2 || !senha3)) this.mensagem.push('Campo(s) vazio(s).');
    else if (!this.isValidCPF(cpf)) this.mensagem.push('CPF inválido!')
    else if (senha2 !== senha3) this.mensagem.push('Os campos das senhas precisam ser iguais.');
    else if (senha1 === (senha2 && senha3)) this.mensagem.push('A nova senha não pode ser igual a anterior.');
    else {
      const authMessages = await this.validationAuth(cpf, 1, senha1);
      this.mensagem = [...authMessages];
    }
    this.resposta = [...this.mensagem];
    return this.resposta;
  }

  async validationAuth(cpf: string, op: number, senha: string): Promise<string[]> {
    this.mensagem = [];
    return new Promise((resolve) => {
      this.profissional.buscarProfissional(cpf).subscribe(profissional => {
        this.usuario = profissional;
        if (this.usuario) {
          if (op === 1) {
            if (this.usuario.senha !== senha) this.mensagem.push('Senha antiga incorreta.');
          } else if (op === 0) {
            if (this.usuario.senha !== senha) this.mensagem.push('Senha incorreta!');
          }
        } else this.mensagem.push('Usuário não cadastrado no sistema, contacte a administração do sistema para o cadastro!');


        this.resposta = [...this.mensagem];
        resolve([...this.mensagem]);
      });
    });
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
