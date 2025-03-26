import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../../models/paciente';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-lista-pacientes',
  imports: [CommonModule, HttpClientModule, NgFor, FormsModule],
  templateUrl: './lista-pacientes.component.html',
  styleUrl: './lista-pacientes.component.css'
})
export class ListaPacientesComponent {

  buscou: boolean = false;
  nome: string = '';
  paciente: Paciente[]=[];
  pacienteOriginal: Paciente[]=[];
  pacientePesquisa:  Paciente[]=[];

  constructor(
    private readonly pacienteService: PacienteService,
    private readonly router: Router) { }

  ngOnInit() {
    this.listarHospitais();
  }
  listarHospitais() {
    this.pacienteService.getPaciente().subscribe(resp => {
      this.paciente = resp;
      this.pacienteOriginal = [...this.paciente];
    });
    this.paciente = this.paciente.sort((a, b) => a.nome.localeCompare(b.nome));

  }
  irParaPaciente(id: string) {
    this.router.navigate(['/paciente', id]);
  }

  pesquisar(nome: string) {
    this.buscou = true;
    if (!nome || nome.trim() === '') {
      this.pacientePesquisa = [];
      this.paciente = [...this.pacienteOriginal];
      return;
    }

    const termo = nome.trim().toLowerCase();
    this.pacientePesquisa = this.paciente.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
    this.paciente = this.pacientePesquisa;
  }
}
