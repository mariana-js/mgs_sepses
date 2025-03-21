import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { DadosClinicos } from '../models/dados_clinicos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DadosClinicosService {
  private readonly api = 'http://localhost:8080/paciente/dados_clinicos';
  dados: DadosClinicos[] = [];
  constructor(private readonly http: HttpClient) { }

  getDadosClinicos(): Observable<DadosClinicos[]> {
    return this.http.get<DadosClinicos[]>(`${this.api}`);
  }

  addDadosClinicos(dados: DadosClinicos): Observable<DadosClinicos> {
    dados.id = uuidv4();
    this.dados.push(dados);
    return this.http.post<DadosClinicos>(this.api, dados);
  }

  updateDadosClinicos(dados: DadosClinicos): Observable<DadosClinicos> {
    console.log(dados.id)
    return this.http.put<DadosClinicos>(`${this.api}/${dados.id}`, dados);
}

  deleteDadosClinicos(id: string): Observable<void> {
    this.dados = this.dados.filter(resp => resp.id !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
