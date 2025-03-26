import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SituacaoAdversa } from '../models/situacao_adversa';
@Injectable({
  providedIn: 'root'
})
export class SituacaoAdversaService {
  private readonly api = 'http://localhost:8080/paciente/situacao_adversa';
  situacao: SituacaoAdversa[] = [];
  constructor(private readonly http: HttpClient) { }

  getSituacaoAdversa(): Observable<SituacaoAdversa[]> {
    return this.http.get<SituacaoAdversa[]>(`${this.api}`);
  }

  addSituacaoAdversa(situacao: SituacaoAdversa): Observable<SituacaoAdversa> {
    // situacao.id = uuidv4();
    this.situacao.push(situacao);
    return this.http.post<SituacaoAdversa>(this.api, situacao);
  }

  updateSituacaoAdversa(situacao: SituacaoAdversa): Observable<SituacaoAdversa> {
    return this.http.put<SituacaoAdversa>(`${this.api}/${situacao.id}`, situacao);
}

  deleteSituacaoAdversa(id: string): Observable<void> {
    this.situacao = this.situacao.filter(resp => resp.id !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
