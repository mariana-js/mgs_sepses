import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DadosClinicos } from '../../models/dados_clinicos';
import { Log } from '../../models/log';
import { Paciente } from '../../models/paciente';
import { Profissional } from '../../models/profissional';
import { SituacaoAdversa } from '../../models/situacao_adversa';
import { ConexaoService } from '../../services/conexao.service';
import { LogService } from '../../services/log.service';
import { PacienteService } from '../../services/paciente.service';
import { SituacaoAdversaService } from '../../services/situacao-adversa.service';
import { ValidationService } from '../../services/validation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerenciar-situacao-adversa',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './gerenciar-situacao-adversa.component.html',
  styleUrl: './gerenciar-situacao-adversa.component.css'
})
export class GerenciarSituacaoAdversaComponent {
  mensage: string = '';
  nomeProfissional: string | undefined;

  profissional: Profissional | null;
  pacienteSelecionado: Paciente | undefined;
  dadosClinicos: DadosClinicos | undefined;

  data: string = '';
  responsavel: string | undefined;
  situacaoAdversa: string = '';

  newSituacaoAdversa: SituacaoAdversa = {
    id: '',
    idpaciente: '',
    idprofissional: '',
    descricaoSituacaoAdversa: '',
    data: ''
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
    private readonly situacaoAdversaService: SituacaoAdversaService,
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

  salvar() {
    this.addSituacaoAdversa();
  }
  carregarDadosBasicos() {
    const datahoje = new Date();
    this.data = datahoje.toISOString().split('T')[0];
    this.responsavel = this.conexaoService.getProfissional()?.nome;
  }
  addSituacaoAdversa() {
    this.newSituacaoAdversa.descricaoSituacaoAdversa = this.situacaoAdversa;
    if (this.profissional) {
      this.newSituacaoAdversa.idprofissional = this.profissional?.idProfissional;
    }
    if (this.pacienteSelecionado) {
      this.newSituacaoAdversa.idpaciente = this.pacienteSelecionado?.idPaciente;
    }

    this.situacaoAdversaService.addSituacaoAdversa(this.newSituacaoAdversa).subscribe({
      next: (res) => {
        alert('Situação adversa adicionada com sucesso!')
        this.addlog();
      },
      error: (err) => {
        console.error('Erro ao adicionar Situação adversa:', err);
        alert('Erro ao adicionar Situação adversa!')
      }
    });

  }
  addlog() {
    let msg = 'cadastro-situacao-adversa';

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
