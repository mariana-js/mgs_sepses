import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HosPac } from '../models/hos-pac';

@Injectable({
  providedIn: 'root'
})
export class HosPacService {
  private readonly api = 'http://localhost:8080/hosPac';
  hosPac: HosPac[] = [];
  
  constructor(private readonly http: HttpClient) { }

  getHosPac(): Observable<HosPac[]> {
    return this.http.get<HosPac[]>(`${this.api}`);
  }

  addHosPac(hosPac: HosPac): Observable<HosPac> {
    this.hosPac.push(hosPac);
    return this.http.post<HosPac>(this.api, hosPac);
  }

  updateHosPac(hosPac: HosPac): Observable<HosPac> {
    return this.http.put<HosPac>(`${this.api}/${hosPac.id}`, hosPac);
  }

  deleteHosPac(id: string): Observable<void> {
    this.hosPac = this.hosPac.filter(resp => resp.id !== id);
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
