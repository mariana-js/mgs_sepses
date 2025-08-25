import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital';
import { Profissional } from '../models/profissional';
type ConexaoData = {
  profissional: Profissional | null;
  hospital: Hospital | null;
};
@Injectable({
  providedIn: 'root'
})
export class ConexaoService {

  private conexao: ConexaoData = { profissional: null, hospital: null };
  private readonly KEY = 'conexao';

  constructor() {
    if (this.isBrowser()) {
      const saved = localStorage.getItem(this.KEY);
      if (saved) {
        this.conexao = JSON.parse(saved);
      }
    }
  }

  // ---------- Profissional ----------
  setProfissional(prof: Profissional): void {
    this.conexao.profissional = prof;
    this.save();
  }

  getProfissional(): Profissional | null {
    return this.conexao.profissional;
  }

  // ---------- Hospital ----------
  setHospital(hosp: Hospital): void {
    this.conexao.hospital = hosp;
    this.save();
  }

  getHospital(): Hospital | null {
    return this.conexao.hospital;
  }

  // ---------- Gerais ----------
  limpar(): void {
    this.conexao = { profissional: null, hospital: null };
    if (this.isBrowser()) {
      localStorage.removeItem(this.KEY);
    }
  }

  isAutenticado(): boolean {
    return !!this.conexao.profissional;
  }

  // ---------- Interno ----------
  private save(): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.KEY, JSON.stringify(this.conexao));
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
