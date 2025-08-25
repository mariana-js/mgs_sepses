import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { RiscoSepse } from '../models/risco_sepse';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})

export class RiscoSepseService {
  private readonly api = 'http://localhost:8080/paciente/risco_sepse';
  risco: RiscoSepse[] = [];
  constructor(private readonly http: HttpClient) { }

  getRiscoSepse(): Observable<RiscoSepse[]> {
    return this.http.get<RiscoSepse[]>(`${this.api}`);
  }

  buscarRiscoPaciente(paciente: Paciente): Observable<RiscoSepse | undefined>{
    return this.getRiscoSepse().pipe(
      map((riscos => riscos.find(r => r.idPaciente === paciente.idPaciente && r.data === paciente.dataAlteracao)))
    )
  }

  addRiscoSepse(risco: RiscoSepse): Observable<RiscoSepse> {
    this.risco.push(risco);
    return this.http.post<RiscoSepse>(this.api, risco);
  }

  updateRiscoSepse(risco: RiscoSepse): Observable<RiscoSepse> {
    return this.http.put<RiscoSepse>(`${this.api}/${risco.id}`, risco);
}

  deleteRiscoSepse(id: string): Observable<void> {
    this.risco = this.risco.filter(resp => resp.id !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
