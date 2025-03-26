import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Log } from '../models/log';
import { Profissional } from '../models/profissional';
import { Hospital } from '../models/hospital';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly api = 'http://localhost:8080/log';
  login: string = '';
  alterarSenha: string = '';
  log1: Log[] = [];
  descricao: string = '';
  resgistro: string = '';

  constructor(
    private readonly http: HttpClient
  ) { }

  getLog(): Observable<Log[]> {
    return this.http.get<Log[]>(this.api);
  }
  buscarLog(id: string): Observable<Log | undefined> {
    return this.getLog().pipe(
      map((logs: Log[]) => logs.find(log => log.idLog === id))
    );
  }

  addlog(log: Log, profissional: Profissional, mensagem: string, data: Date,
    profissional2?: Profissional,
    hospital?: Hospital,
    paciente?: Paciente
  ): Observable<Log> {

    log.idProfissional = profissional.idProfissional;

    const dataAtual = new Date();
    const dataFormatada = new Date(
      Date.UTC(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate())
    );

    log.data = dataFormatada;

    if (['login', 'recuperar-senha'].includes(mensagem)) log.descricao = this.mensagemAuth(mensagem, profissional);

    if (profissional2 !== undefined) {
      if (['cadastro-usuario', 'atualizar-usuario'].includes(mensagem)) log.descricao = this.mensagemGerenciarUsuario(mensagem, profissional, profissional2);
    }
    else if (hospital !== undefined) {
      if (['cadastro-hospital', 'atualizar-hospital'].includes(mensagem)) log.descricao = this.mensagemGerenciarHospital(mensagem, profissional, hospital);
    }
    else if (paciente !== undefined) {

      if (
        ['cadastro-paciente',
          'atualizar-paciente',
          'cadastro-dados-clinicos',
          'atualizar-dados-clinicos',
          'cadastro-situacao-adversa',
          'atualizar-situacao-adversa']
          .includes(mensagem))

        log.descricao = this.mensagemGerenciarPaciente(mensagem, profissional, paciente);
    }


    return this.http.post<Log>(this.api, log).pipe(
      tap(response => response),
      catchError(error => {
        console.error("Erro ao enviar log:", error);
        return throwError(() => new Error("Erro ao enviar log"));
      })
    );
  }


  // Mensagens
  mensagemAuth(op: string, profissional: Profissional): string {
    const data = new Date();
    switch (op) {
      case 'login':
        this.resgistro = 'fez login no sistema'
        break;
      case 'recuperar-senha':
        this.resgistro = 'alterou a senha de acesso no sistema';
        break;
      default: alert('erro')
    }

    this.descricao = ` ${profissional.nome} - ${profissional.cpf} ${this.resgistro} às ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')} do dia ${data.getDate().toString().padStart(2, '0')}-${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getFullYear()}.`
    return this.descricao;
  }
  mensagemGerenciarUsuario(op: string, profissional: Profissional, profissional2: Profissional): string {
    const data = new Date();
    switch (op) {
      case 'cadastro-usuario':
        this.resgistro = 'cadastrou o usuário'
        break;
      case 'atualizar-usuario':
        this.resgistro = 'alterou o usuário'
        break;
      default: alert('erro')
    }

    this.descricao = ` ${profissional.nome} - ${profissional.cpf} ${this.resgistro} ${profissional2.nome} - ${profissional2.cpf} no sistema às ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')} do dia ${data.getDate().toString().padStart(2, '0')}-${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getFullYear()}.`
    return this.descricao;
  }

  mensagemGerenciarHospital(op: string, profissional: Profissional, hospital: Hospital): string {
    const data = new Date();
    switch (op) {
      case 'cadastro-hospital':
        this.resgistro = 'cadastrou o hospital'
        break;
      case 'atualizar-hospital':
        this.resgistro = 'alterou o hospital'
        break;
      default: alert('erro')
    }

    this.descricao = ` ${profissional.nome} - ${profissional.cpf} ${this.resgistro} ${hospital.razaosocial} - ${hospital.cnpj} no sistema às ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')} do dia ${data.getDate().toString().padStart(2, '0')}-${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getFullYear()}.`
    return this.descricao;
  }
  mensagemGerenciarPaciente(op: string, profissional: Profissional, paciente: Paciente): string {
    const data = new Date();
    switch (op) {
      case 'cadastro-paciente':
        this.resgistro = 'cadastrou o paciente'
        break;
      case 'atualizar-paciente':
        this.resgistro = 'alterou os dados pessoais do paciente'
        break;
      case 'cadastro-dados-clinicos':
        this.resgistro = 'cadastrou os dados clinicos do paciente'
        break;
      case 'atualizar-dados-clinicos':
        this.resgistro = 'alterou os dados clinicos do paciente'
        break;
      case 'cadastro-situacao-adversa':
        this.resgistro = 'cadastrou uma situação adversa do paciente'
        break;
      case 'atualizar-situacao-adversa':
        this.resgistro = 'alterou a situação adversa do paciente'
        break;
      default: alert('erro')
    }
    this.descricao = ` ${profissional.nome} - ${profissional.cpf} ${this.resgistro} ${paciente.nome} - ${paciente.cpf} no sistema às ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')} do dia ${data.getDate().toString().padStart(2, '0')}-${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getFullYear()}.`
    return this.descricao;
  }

}
