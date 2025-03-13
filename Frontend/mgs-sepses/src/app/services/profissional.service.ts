import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profissional } from '../models/profissional';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {
  private readonly api = '';
  profissional: Profissional[] = [];
  constructor(private readonly http: HttpClient) { }

  getProfissional(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(this.api);
  }

  buscarProfissional(cpf: string) {
    this.getProfissional();
    const prof = this.profissional.find(profissional => profissional.cpf === cpf)
    return prof;
  }

  addProfissional(profissional: Profissional): Observable<Profissional> {
    profissional.id_profissional = uuidv4();
    this.profissional.push(profissional);
    return this.http.post<Profissional>(this.api, profissional);
  }

  updateProfisssional(profisional: Profissional): Observable<Profissional> {
    const index = this.profissional.findIndex(i => i.id_profissional === profisional.id_profissional);
    if (index !== -1) {
      this.profissional[index] = profisional;
    }
    return this.http.put<Profissional>(`${this.api}/${profisional.id_profissional}`, profisional);
  }

  deleteProfissional(id: string): Observable<void> {
    this.profissional = this.profissional.filter(prof => prof.id_profissional !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
