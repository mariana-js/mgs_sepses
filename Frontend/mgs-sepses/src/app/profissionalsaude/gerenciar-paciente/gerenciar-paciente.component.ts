import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Log } from '../../models/log';
import { Paciente } from '../../models/paciente';
import { ConexaoService } from '../../services/conexao.service';
import { LogService } from '../../services/log.service';
import { PacienteService } from '../../services/paciente.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-gerenciar-paciente',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterOutlet, NgIf],
  templateUrl: './gerenciar-paciente.component.html',
  styleUrl: './gerenciar-paciente.component.css'
})
export class GerenciarPacienteComponent {
  mensage: string = '';
  msgStatus: string = '';
  msgSexo: string = '';
  ativo: boolean = true;
  id: string = '';
  nome: string = '';
  cpf: string = '';
  celular1: string = '';
  celular2: string = '';
  sexo: string = '';
  riscoSepse: string = '';
  dataNascimento: Date | undefined;
  dataAlteracao: Date | undefined;

  sx: boolean = false;
  st: boolean = false;

  pacienteSelecionado: Paciente | undefined;

  newPaciente: Paciente = {
    idPaciente: '',
    nome: '',
    cpf: '',
    dataNascimento: new Date(),
    sexo: '',
    celular1: '',
    celular2: '',
    ativo: false,
    riscoSepse: '',
    dataAlteracao: new Date()
  }

  newLog: Log = {
    idLog: '',
    idProfissional: '',
    data: new Date(),
    descricao: ''
  }

  constructor(
    private readonly router: Router,
    private readonly pacienteService: PacienteService,
    private readonly conexaoService: ConexaoService,
    private readonly route: ActivatedRoute,
    private readonly logService: LogService,
    private readonly validationService: ValidationService
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.pacienteService.buscarPacienteID(id).subscribe(pac => {
        this.pacienteSelecionado = pac;
        if (this.pacienteSelecionado) this.carregarDadosSelecionado();
      });
    });

  }

  carregarDadosSelecionado() {
    if (this.pacienteSelecionado) {
      this.id = this.pacienteSelecionado.idPaciente
      this.nome = this.pacienteSelecionado.nome
      this.ativo = this.pacienteSelecionado.ativo
      this.cpf = this.pacienteSelecionado.cpf
      this.celular1 = this.pacienteSelecionado.celular1
      this.celular2 = this.pacienteSelecionado.celular2
      this.sexo = this.pacienteSelecionado.sexo
      this.dataNascimento = this.pacienteSelecionado.dataNascimento

      if (this.ativo) this.msgStatus = "Status: Ativo"
      else this.msgStatus = "Status: Desativado"

      if (this.sexo === 'Feminino') this.msgSexo = "Sexo: Feminino"
      else if (this.sexo === 'Masculino') this.msgSexo = "Sexo: Masculino"

      // console.log(this.id, this.nome, this.ativo, this.cpf, this.celular1, this.celular2, this.sexo, this.dataNascimento)
    }
  }
  async salvar() {
    if (this.pacienteSelecionado) {
      await this.altPaciente();
    } else {
      await this.addPaciente();
    }
  }

  addPaciente() {
    this.newPaciente.nome = this.nome;
    this.newPaciente.ativo = this.ativo;
    this.newPaciente.cpf = this.cpf;
    this.newPaciente.sexo = this.sexo;
    this.newPaciente.celular1 = this.celular1;
    this.newPaciente.celular2 = this.celular2;
    this.newPaciente.ativo = this.ativo;
    if (this.dataNascimento) { this.newPaciente.dataNascimento = this.dataNascimento; }

    this.pacienteService.addPaciente(this.newPaciente).subscribe({
      next: (res) => {
        alert('Paciente adicionado com sucesso!')
        this.addlog();
      },
      error: (err) => {
        console.error('Erro ao registrar paciente:', err);
        alert('Erro ao adicionar paciente!')
      }
    });
  }
  altPaciente() {
    this.newPaciente.idPaciente = this.id;
    this.newPaciente.nome = this.nome;
    this.newPaciente.ativo = this.ativo;
    this.newPaciente.cpf = this.cpf;
    this.newPaciente.sexo = this.sexo;
    this.newPaciente.celular1 = this.celular1;
    this.newPaciente.celular2 = this.celular2;
    this.newPaciente.ativo = this.ativo;
    if (this.dataNascimento) { this.newPaciente.dataNascimento = this.dataNascimento; }

    this.pacienteService.updatePaciente(this.newPaciente).subscribe({
     next: (res) => {
        alert('Paciente atualizado com sucesso!')
        this.addlog();
      },
      error: (err) => {
        console.error('Erro ao atualizar paciente:', err);
        alert('Erro ao atualizar paciente!')
      }
    });
  }
  addlog() {
    let msg = '';

    if (this.pacienteSelecionado) {
      msg = 'atualizar-paciente'
    } else {
      msg = 'cadastro-paciente'
    }

    if (this.conexaoService) {
      const idprofissional = this.conexaoService.getProfissional();
      if (idprofissional) {
        this.newLog.idProfissional = idprofissional.idProfissional;

        this.logService.addlog(this.newLog, idprofissional, msg, new Date(), undefined, undefined, this.newPaciente).subscribe({
          next: ((res) => res),
          error: (err) => {
            console.error('Erro ao registrar log:', err);
          }
        });
      }
    }
  }
  telaAnterior() {

    if (this.pacienteSelecionado) this.router.navigate(['/paciente', this.pacienteSelecionado.idPaciente])

    else if (!this.pacienteSelecionado) this.router.navigate(['/pacientes'])
  }

}

