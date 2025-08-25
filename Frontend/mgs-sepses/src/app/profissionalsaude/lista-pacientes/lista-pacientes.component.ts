import { CommonModule, NgClass, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../../models/paciente';
import { ConexaoService } from '../../services/conexao.service';
import { HosPacService } from '../../services/hos-pac.service';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-lista-pacientes',
  imports: [CommonModule, HttpClientModule, NgFor, FormsModule, NgClass],
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent {

  buscou: boolean = false;
  nome: string = '';
  paciente: Paciente[] = [];
  pacienteOriginal: Paciente[] = [];
  pacientePesquisa: Paciente[] = [];

  constructor(
    private readonly pacienteService: PacienteService,
    private readonly router: Router,
    private readonly conexaoService: ConexaoService,
    private readonly hospacService: HosPacService) { }

  ngOnInit() {
    const hospitalSelecionado = this.conexaoService.getHospital();
    if (hospitalSelecionado) this.listarHospitais();
  }
  listarHospitais() {
    const idHospital = this.conexaoService.getHospital()?.idHospital
    if (idHospital) {
      // Buscar os pacientes do hospital selecionado
      this.hospacService.getHosPacIdHospital(idHospital).subscribe({
        next: ((res) => {
          const listahospac = res;

          this.pacienteService.buscarPacientesPorHosPac(listahospac).subscribe({
            next: ((res => {
              this.paciente = res;
              this.pacienteOriginal = [...this.paciente];
            })),
            error: (err) => {
              console.error('Erro ao trazer pacientes do hospital selecionado:', err);
            }
          })

        }),
        error: (err) => {
          console.error('Erro ao trazer hospacs do hospital selecionado:', err);
        }
      });
      this.paciente = this.paciente.sort((a, b) => a.nome.localeCompare(b.nome));
    }
  }
  irParaPaciente(id: string) {
    this.router.navigate(['/paciente', id]);
  }
  classeRisco(risco: string) {
    const classe: string = '';
    switch (risco) {
      case '':
        classe === 'estavel';
        break;
      case '0%':
        classe === 'estavel';
        break;
      case '10%':
        classe === 'grave';
        break;
      case '15%':
        classe === 'muitograve';
        break;
      case '20%':
        classe === 'critico';
        break;
      case '30%':
        classe === 'extremamentecritico';
        break;

      default:
    }

    return classe;
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
