import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Medico } from '../models/medico';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private readonly api = 'http://localhost:8080/profissional/medico';
  medico: Medico[] = [];
  constructor(private readonly http: HttpClient) { }

  getMedico(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.api}`);
  }

  addMedico(medico: Medico): Observable<Medico> {
    medico.idprofissional = uuidv4();
    this.medico.push(medico);
    return this.http.post<Medico>(this.api, medico);
  }

  updateMedico(medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.api}/${medico.idprofissional}`, medico);
}

  deleteMedico(id: string): Observable<void> {
    this.medico = this.medico.filter(resp => resp.idprofissional !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
