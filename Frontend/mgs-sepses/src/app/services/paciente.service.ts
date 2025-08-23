import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Paciente } from '../models/paciente';
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
  buscarPacienteID(id: string): Observable<Paciente | undefined> {
    return this.getPaciente().pipe(
      map((pacientes: Paciente[]) => pacientes.find(paciente => paciente.idPaciente === id))
    );
  }

  addPaciente(paciente: Paciente): Observable<Paciente> {
    this.paciente.push(paciente);
    return this.http.post<Paciente>(this.api, paciente);
  }

  updatePaciente(paciente: Paciente): Observable<Paciente> {
    if (!paciente?.idPaciente) {
      throw new Error('Paciente sem idPaciente para update');
    }
    const url = `${this.api}/${paciente.idPaciente}`; // sem barra final extra
    console.log('PUT URL:', url);
    return this.http.put<Paciente>(url, paciente);
  }

  deletePaciente(id: string): Observable<void> {
    this.paciente = this.paciente.filter(resp => resp.idPaciente !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
