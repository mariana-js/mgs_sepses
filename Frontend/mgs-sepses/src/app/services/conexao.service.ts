import { Injectable } from '@angular/core';
import { Profissional } from '../models/profissional';

@Injectable({
  providedIn: 'root'
})
export class ConexaoService {

  private profissional: Profissional | null = null;

  constructor() {
    // Evita erro ao rodar em SSR
    if (this.isBrowser()) {
      const dadosSalvos = localStorage.getItem('profissional');
      if (dadosSalvos) {
        this.profissional = JSON.parse(dadosSalvos);
      }
    }
  }

  setProfissional(dados: Profissional): void {
    this.profissional = dados;
    if (this.isBrowser()) {
      localStorage.setItem('profissional', JSON.stringify(dados));
    }
  }

  getProfissional(): Profissional | null {
    return this.profissional;
  }

  limpar(): void {
    this.profissional = null;
    if (this.isBrowser()) {
      localStorage.removeItem('profissional');
    }
  }

  isAutenticado(): boolean {
    return !!this.profissional;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
