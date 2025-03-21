import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
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

  addHospital(hospital: Hospital): Observable<Hospital> {
    hospital.id_hospital = uuidv4();
    this.hospital.push(hospital);
    return this.http.post<Hospital>(this.api, hospital);
  }

  updateHospital(hospital: Hospital): Observable<Hospital> {
    console.log(hospital.id_hospital)
    return this.http.put<Hospital>(`${this.api}/${hospital.id_hospital}`, hospital);
}

  deleteHospital(id: string): Observable<void> {
    this.hospital = this.hospital.filter(resp => resp.id_hospital !== id);
    return this.http.delete<void>(`${this.api}/${id}`)
  }
}
