import { Injectable } from '@angular/core';
import { Enfermeiro } from '../models/enfermeiro';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EnfermeiroService {
  private readonly api = 'http://localhost:8080/profissional/enfermeiro';
  enfermeiro: Enfermeiro[] = [];
  constructor(private readonly http: HttpClient) { }

  getEnfermeiro(): Observable<Enfermeiro[]> {
    return this.http.get<Enfermeiro[]>(`${this.api}`);
  }

  addEnfermeiro(enfermeiro: Enfermeiro): Observable<Enfermeiro> {
    // enfermeiro.idprofissional = uuidv4();
    this.enfermeiro.push(enfermeiro);
    return this.http.post<Enfermeiro>(this.api, enfermeiro);
  }

  updateEnfermeiro(enfermeiro: Enfermeiro): Observable<Enfermeiro> {
    console.log(enfermeiro.idprofissional)
    return this.http.put<Enfermeiro>(`${this.api}/${enfermeiro.idprofissional}`, enfermeiro);
}

  deleteEnfermeiro(id: string): Observable<void> {
    this.enfermeiro = this.enfermeiro.filter(resp => resp.idprofissional !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
