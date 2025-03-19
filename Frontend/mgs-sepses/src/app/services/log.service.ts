import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Log } from '../models/log';
import { Profissional } from '../models/profissional';

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

  addlog(log: Log, profissional: Profissional, mensagem: string, data: Date): Observable<Log> {
    log.id_log = '';
    log.idProfissional = profissional.idProfissional;

    const dataAtual = new Date();
    const dataFormatada = new Date(
      Date.UTC(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate())
    );

    log.data = dataFormatada;
    log.descricao = this.mensagem(mensagem, profissional);

    return this.http.post<Log>(this.api, log).pipe(
      tap(response => response),
      catchError(error => {
        console.error("Erro ao enviar log:", error);
        return throwError(() => new Error("Erro ao enviar log"));
      })
    );
  }


  // Mensagens
  mensagem(op: string, profissional: Profissional): string {
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
}
