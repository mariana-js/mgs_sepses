import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Paciente } from '../../models/paciente';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-paciente',
  imports: [CommonModule, HttpClientModule, RouterOutlet, RouterLink],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {
  data: Date | undefined;
  idade: number | undefined;
  paciente: Paciente | undefined;
  status: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly pacienteService: PacienteService
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.pacienteService.buscarPacienteID(id).subscribe(paciente => {
        this.paciente = paciente;

        if (paciente) {
          this.data = paciente?.dataNascimento;
          this.idade = this.calcularIdade(this.data);
          this.carregarDados(paciente.idPaciente);
          if (paciente.ativo) this.status = 'Paciente: Ativo'
          else this.status = 'Paciente: Desativado'
        }
      });
    });

  }

  carregarDados(id: string) {
    this.pacienteService.getPaciente().subscribe((resp) => {
      this.paciente = resp.find(res => res.idPaciente === id);
    })
  }

  calcularIdade(dataNascimento: Date): number {
    const nascimento = new Date(dataNascimento);
    const atual = new Date();

    let idade = atual.getFullYear() - nascimento.getFullYear();
    const mes = atual.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && atual.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;

  }
}
