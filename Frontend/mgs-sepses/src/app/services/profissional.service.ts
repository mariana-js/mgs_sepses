import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profissional } from '../models/profissional';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {
  private readonly api = 'http://localhost:8080/profissional';
  profissional: Profissional[] = [];
  constructor(private readonly http: HttpClient) { }

  getProfissional(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(`${this.api}`);
  }
  buscarProfissionalId(id: string): Observable<Profissional | undefined> {
    return this.getProfissional().pipe(
      map((profs: Profissional[]) => profs.find(prof => prof.idProfissional === id))
    );
  }
  buscarProfissional(cpf: string): Observable<Profissional | undefined> {
    return this.getProfissional().pipe(
      map(profissionais => profissionais.find(profissional => profissional.cpf === cpf))
    );
  }


  addProfissional(profissional: Profissional): Observable<Profissional> {
    this.profissional.push(profissional);
    return this.http.post<Profissional>(this.api, profissional);
  }

  updateProfissional(profissional: Profissional): Observable<Profissional> {
    return this.http.put<Profissional>(`${this.api}/${profissional.idProfissional}`, profissional);
}

  deleteProfissional(id: string): Observable<void> {
    this.profissional = this.profissional.filter(prof => prof.idProfissional !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
