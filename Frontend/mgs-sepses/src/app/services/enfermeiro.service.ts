import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Enfermeiro } from '../models/enfermeiro';
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
    this.enfermeiro.push(enfermeiro);
    return this.http.post<Enfermeiro>(this.api, enfermeiro);
  }
  buscarCOREN(coren: string): Observable<Enfermeiro | undefined> {
    return this.getEnfermeiro().pipe(
      map(enfermeiro => enfermeiro.find(medico => medico.coren === coren))
    );
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
