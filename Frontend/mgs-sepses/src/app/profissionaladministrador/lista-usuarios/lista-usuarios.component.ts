import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Profissional } from '../../models/profissional';
import { EnfermeiroService } from '../../services/enfermeiro.service';
import { MedicoService } from '../../services/medico.service';
import { ProfissionalService } from '../../services/profissional.service';
interface ProfissionalList {
  id: string;
  cpf: string;
  nome: string;
  atuacao: string;
}
@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule, HttpClientModule, NgFor, FormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
  nome: string = '';
  profissional: Profissional[] = [];
  newProfissional: ProfissionalList[] = [];
  newProfissionalPesquisa: ProfissionalList[] = [];
  newProfissionalOriginal: ProfissionalList[] = [];
  buscou: boolean = false;

  ngOnInit() {
    this.listarUsuarios();
  }

  constructor(
    private readonly profisionalService: ProfissionalService,
    private readonly enfermeiroService: EnfermeiroService,
    private readonly medicoService: MedicoService,
    private readonly router: Router) { }

  listarUsuarios() {
    this.profisionalService.getProfissional().subscribe(resp => {
      this.profissional = resp;
    });
    this.listarProfissionalTI();
    this.listarProfissionalMedico();
    this.listarProfissionalEnfermeiro();
    this.newProfissional = this.newProfissional.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  listarProfissionalTI() {
    this.profisionalService.getProfissional().subscribe(resp => {
      const tiProfissionais = resp
        .filter(p => p.admin === true)
        .map(p => ({
          id: p.idProfissional,
          cpf: p.cpf,
          nome: p.nome,
          atuacao: "TI"
        }));

      this.newProfissional.push(...tiProfissionais);
    });
  }
  listarProfissionalMedico() {
    this.medicoService.getMedico().subscribe(medicos => {
      const medicosFiltrados = this.profissional
        .filter(p => medicos.some(m => m.idprofissional === p.idProfissional))
        .map(p => ({
          id: p.idProfissional,
          cpf: p.cpf,
          nome: p.nome,
          atuacao: "Médico"
        }));

      // ✅ Adiciona na lista sem sobrescrever
      this.newProfissional = [...this.newProfissional, ...medicosFiltrados];
    });
  }
  listarProfissionalEnfermeiro() {
    this.enfermeiroService.getEnfermeiro().subscribe(enfermeiros => {
      const enfermeirosFiltrados = this.profissional
        .filter(p => enfermeiros.some(e => e.idprofissional === p.idProfissional))
        .map(p => ({
          id: p.idProfissional,
          cpf: p.cpf,
          nome: p.nome,
          atuacao: "Enfermeiro"
        }));

      // ✅ Adiciona na lista sem sobrescrever
      this.newProfissional = [...this.newProfissional, ...enfermeirosFiltrados];
      this.newProfissional = this.newProfissional.sort((a, b) => a.nome.localeCompare(b.nome));
      this.newProfissionalOriginal = [...this.newProfissional]

    });
  }

  pesquisar(nome: string) {
    this.buscou = true;
   
    if (!nome || nome.trim() === '') {
      this.newProfissionalPesquisa = [...this.newProfissional];
      this.newProfissional = [...this.newProfissionalOriginal];

      return;
    }

    const termo = nome.trim().toLowerCase();
    this.newProfissionalPesquisa = this.newProfissional.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
    this.newProfissional = this.newProfissionalPesquisa;
  }

}
