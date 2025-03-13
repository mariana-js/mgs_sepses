import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Log } from '../models/log';
import { ProfissionalService } from './profissional.service';
import { Profissional } from '../models/profissional';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly api = '';
  login: string = '';
  alterarSenha: string = '';
  log: Log[] = [];
  descricao: string = '';

  constructor(
    private readonly http: HttpClient
  ) { }

  getLog(): Observable<Log[]> {
    return this.http.get<Log[]>(this.api);
  }

  addlog(log: Log, profisional: Profissional, mensagem: string, data: Date): Observable<Log> {
    log.id_log = uuidv4();
    log.data = data;
    log.descricao = this.mensagem(mensagem, profisional);

    this.log.push(log);

    console.log(log)
    return this.http.post<Log>(this.api, log);

  }

  // Mensagens
  mensagem(op: string, profissional: Profissional): string {

    const data = new Date();
    switch (op) {
      case 'login':
        this.descricao = (
          profissional.nome + ' - ' + profissional.cpf + ' fez login no sistema às ' + data.getHours +
          ' do dia ' + data.getDate
        )
        break;
      case 'recuperar-senha':
        this.descricao = (
          profissional.nome + ' - ' + profissional.cpf + ' fez alterou a senha de acesso no sistema às ' + data.getHours +
          ' do dia ' + data.getDate
        );
        break;
        default: alert('erro')
    }

    return this.descricao;
  }
}
