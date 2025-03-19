import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
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

  buscarProfissional(cpf: string): Observable<Profissional | undefined> {
    return this.getProfissional().pipe(
      map(profissionais => profissionais.find(profissional => profissional.cpf === cpf))
    );
  }


  addProfissional(profissional: Profissional): Observable<Profissional> {
    profissional.idProfissional = uuidv4();
    this.profissional.push(profissional);
    return this.http.post<Profissional>(this.api, profissional);
  }

  updateProfissional(profissional: Profissional): Observable<Profissional> {
    console.log(profissional.idProfissional)
    return this.http.put<Profissional>(`${this.api}/${profissional.idProfissional}`, profissional);
}



  deleteProfissional(id: string): Observable<void> {
    this.profissional = this.profissional.filter(prof => prof.idProfissional !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
