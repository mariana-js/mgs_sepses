import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hospital } from '../models/hospital';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private readonly api = 'http://localhost:8080/hospital';
  hospital: Hospital[] = [];
  constructor(private readonly http: HttpClient) { }

  getHospital(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${this.api}`);
  }

  // Traz a lista de hospitais
  buscarListaHospitaisId(idhospital: string): Observable<Hospital[]> {
    return this.getHospital().pipe(
      map((hospitais: Hospital[] = []) => hospitais.filter(hosp => hosp.idHospital === idhospital))
    );
  }
  buscarHospitalId(id: string): Observable<Hospital | undefined> {
    return this.getHospital().pipe(
      map((hops: Hospital[]) => hops.find(hos => hos.idHospital === id))
    );
  }
  buscarHospitalCNPJ(cnpj: string): Observable<Hospital | undefined> {
    return this.getHospital().pipe(
      map((hops: Hospital[]) => hops.find(hos => hos.cnpj === cnpj))
    );
  }
  buscarHospital(cnpj: string): Observable<Hospital | undefined> {
    return this.getHospital().pipe(
      map((hospitais: Hospital[]) => hospitais.find(hospital => hospital.cnpj === cnpj))
    );
  }

  addHospital(hospital: Hospital): Observable<Hospital> {
    this.hospital.push(hospital);
    return this.http.post<Hospital>(this.api, hospital);
  }

  updateHospital(hospital: Hospital): Observable<Hospital> {
    return this.http.put<Hospital>(`${this.api}/${hospital.idHospital}`, hospital);
  }

  deleteHospital(id: string): Observable<void> {
    this.hospital = this.hospital.filter(resp => resp.idHospital !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
