import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Profissional } from '../models/profissional';
import { HospitalService } from './hospital.service';
import { ProfissionalService } from './profissional.service';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {

  cpf: string = '';
  senha: string = '';
  mensagem: string[] = [];
  resposta: string[] = [];
  usuario: Profissional | undefined;

  constructor(
    private readonly profissional: ProfissionalService,
    private readonly hospitalService: HospitalService

  ) { }


  // Autenticação
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
          if (this.usuario.status === false) this.mensagem.push('Usuário bloqueado, contactar o adminstrador do sistema!');
        } else this.mensagem.push('Usuário não cadastrado, contactar o adminstrador do sistema!');


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

  // Validador de CNPJ


  // Profissional

  async validationProfissional(
    idHospital: string,
    cpf: string,
    senha: string,
    nome: string,
    email: string,
    profissional: string,
    codigo?: string,
    estado?: string
  ): Promise<string[]> {
    const mensagens: string[] = [];
    // const profssionalEncontrado = profissional.
    if (!cpf || !senha || !nome || !email) {
      mensagens.push('Campo(s) vazio(s).');
    } else if ((profissional === 'medico' || profissional === 'enfermeiro') && (!codigo || !estado)) {
      mensagens.push('Necessário inserir estado e uf!');
    } else if (!this.isValidCPF(cpf)) {
      mensagens.push('CPF inválido!');
    } else if ( !idHospital) mensagens.push('É necessário selecionar o hospital!');

    return mensagens;
  }

  async validationProfAdicionar(cpf: string): Promise<string[]> {
    const mensagens: string[] = [];
    try {
      const usuarioEncontrado = await firstValueFrom(this.profissional.buscarProfissional(cpf));
      if (usuarioEncontrado) {
        mensagens.push('CPF já cadastrado no sistema!');
      }
    } catch (error) {
      console.error('Erro ao buscar profissional:', error);
    }
    return mensagens;
  }

  async validationHospAdicionar(cnpj: string): Promise<string[]> {
    const mensagens: string[] = [];
    try {
      const hospitalEncontrado = await firstValueFrom(this.hospitalService.buscarHospitalCNPJ(cnpj));
      if (hospitalEncontrado) {
        mensagens.push('CNPJ já cadastrado no sistema!');
      }
    } catch (error) {
      console.error('Erro ao buscar hospital:', error);
    }
    return mensagens;
  }

  // Hospital
  async validationHospital(cnpj: string, razaosocial: string, nomefantasia: string): Promise<string[]> {
    this.mensagem = [];
    if (!cnpj || !razaosocial || !nomefantasia) this.mensagem.push('Campo(s) vazio(s).');
    else if (cnpj.length !== 14) this.mensagem.push('O CNPJ deve conter 14 digítos!')
    this.resposta = [...this.mensagem];
    return this.resposta;
  }
}
