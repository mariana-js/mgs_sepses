import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DadosClinicos } from '../../models/dados_clinicos';
import { Log } from '../../models/log';
import { Paciente } from '../../models/paciente';
import { Profissional } from '../../models/profissional';
import { ConexaoService } from '../../services/conexao.service';
import { DadosClinicosService } from '../../services/dados-clinicos.service';
import { LogService } from '../../services/log.service';
import { PacienteService } from '../../services/paciente.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-gerenciar-dados-clinicos',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './gerenciar-dados-clinicos.component.html',
  styleUrl: './gerenciar-dados-clinicos.component.css'
})
export class GerenciarDadosClinicosComponent {
  mensage: string = '';
  nomeProfissional: string | undefined;

  profissional: Profissional | null;
  pacienteSelecionado: Paciente | undefined;
  dadosClinicos: DadosClinicos | undefined;

  dataExame: string = '';
  responsavel: string | undefined;
  relacaoP02Fi02: string = '';
  ep: string = '';
  plaquetas: string = '';
  diurese: string = '';
  creatinina: string = '';
  pam: string = '';
  dopamina: string = '';
  dobutamina: string = '';
  norepinefrina: string = '';
  glasgow: string = '';
  bilirrubina: string = '';

  newDadosClinicos: DadosClinicos = {
    id: '',
    idPaciente: '',
    idProfissional: '',
    relacaoP02Fi02: '',
    plaquetas: '',
    diurese: '',
    creatinina: '',
    glasgow: '',
    ep: '',
    norepinefrina: '',
    dobutamina: '',
    dopamina: '',
    pam: '',
    bilirrubina: ''
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
    private readonly dadosClinicosService: DadosClinicosService,
    private readonly conexaoService: ConexaoService,
    private readonly route: ActivatedRoute,
    private readonly logService: LogService,
    private readonly validationService: ValidationService
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.pacienteService.buscarPacienteID(id).subscribe(pac => {
        this.pacienteSelecionado = pac;
      });
    });
    this.profissional = conexaoService.getProfissional();
    this.nomeProfissional = this.profissional?.nome;
  }
  ngOnInit() {
    this.carregarDadosBasicos();
  }
  carregarDadosBasicos() {
    const datahoje = new Date();
    this.dataExame = datahoje.toISOString().split('T')[0];
    this.responsavel = this.conexaoService.getProfissional()?.nome;
  }
  salvar() {
    this.addDadosClinicos();
  }

  addDadosClinicos() {
    this.newDadosClinicos.bilirrubina = this.bilirrubina;
    this.newDadosClinicos.creatinina = this.creatinina;
    this.newDadosClinicos.diurese = this.diurese;
    this.newDadosClinicos.dobutamina = this.dobutamina;
    this.newDadosClinicos.dopamina = this.dopamina;
    this.newDadosClinicos.ep = this.ep;
    this.newDadosClinicos.glasgow = this.glasgow;
    this.newDadosClinicos.norepinefrina = this.norepinefrina;
    this.newDadosClinicos.plaquetas = this.plaquetas;
    this.newDadosClinicos.relacaoP02Fi02 = this.relacaoP02Fi02;
    this.newDadosClinicos.pam = this.pam;

    this.newDadosClinicos.idProfissional = this.profissional?.idProfissional;

    if (this.pacienteSelecionado) {
      this.newDadosClinicos.idPaciente = this.pacienteSelecionado?.idPaciente;
    }

    console.log(this.newDadosClinicos)
    this.dadosClinicosService.addDadosClinicos(this.newDadosClinicos).subscribe({
      next: (res) => {
        alert('Dados clínicos adicionados com sucesso!')
        this.addlog();
      },
      error: (err) => {
        console.error('Erro ao adicionar dados clínicos:', err);
        alert('Erro ao adicionar dados clínicos!')
      }
    });

  }
  addlog() {
    let msg = 'cadastro-dados-clinicos';

    if (this.conexaoService) {
      const idprofissional = this.conexaoService.getProfissional();
      if (idprofissional) {
        this.newLog.idProfissional = idprofissional.idProfissional;

        this.logService.addlog(this.newLog, idprofissional, msg, new Date(), undefined, undefined, this.pacienteSelecionado).subscribe({
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
