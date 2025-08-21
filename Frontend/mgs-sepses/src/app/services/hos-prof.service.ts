import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HosProf } from '../models/hos-prof';

@Injectable({
  providedIn: 'root'
})
export class HosProfService {
  private readonly api = 'http://localhost:8080/hosprof';
  hosProf: HosProf[] = [];

  constructor(private readonly http: HttpClient) { }

  getHosProf(): Observable<HosProf[]> {
    return this.http.get<HosProf[]>(`${this.api}`);
  }

  // Traz a lista de hosprof
  buscarHosProfIdProfissional(idprofissional: string): Observable<HosProf[]> {
    return this.getHosProf().pipe(
      map((hosprofs: HosProf[] = []) => hosprofs.filter(hosprof => hosprof.idprofissional === idprofissional))
    );
  }

  // Traz somente um hosprof
  getHosProfIdProf(idhospital: string, idprofissional: string): Observable<HosProf | undefined> {
    return this.getHosProf().pipe(
      map((hosprofs: HosProf[]) => hosprofs.find(hosprof => hosprof.idprofissional === idprofissional && hosprof.idhospital === idhospital))
    );
  }

  addHosProf(hosProf: HosProf): Observable<HosProf> {
    this.hosProf.push(hosProf);
    return this.http.post<HosProf>(this.api, hosProf);
  }

  updateHosProf(hosProf: HosProf): Observable<HosProf> {
    return this.http.put<HosProf>(`${this.api}/${hosProf.id}`, hosProf);
  }

  deleteHosProf(id: string): Observable<void> {
    this.hosProf = this.hosProf.filter(resp => resp.id !== id);
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
