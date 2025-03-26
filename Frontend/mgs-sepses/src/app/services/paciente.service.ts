import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Paciente } from '../models/paciente';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private readonly api = 'http://localhost:8080/paciente';
  paciente: Paciente[] = [];
  constructor(private readonly http: HttpClient) { }

  getPaciente(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.api}`);
  }
  buscarPaciente(cpf: string): Observable<Paciente | undefined> {
    return this.getPaciente().pipe(
      map((pacientes: Paciente[]) => pacientes.find(paciente => paciente.cpf === cpf))
    );
  }

  addPaciente(paciente: Paciente): Observable<Paciente> {
    this.paciente.push(paciente);
    return this.http.post<Paciente>(this.api, paciente);
  }

  updatePaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.api}/${paciente.id_paciente}`, paciente);
  }

  deletePaciente(id: string): Observable<void> {
    this.paciente = this.paciente.filter(resp => resp.id_paciente !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
