import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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


      if (this.ativo) this.msgStatus = "Status: Ativo"
      else this.msgStatus = "Status: Desativado"
    }
  }
  async salvar() {

    // const validacao = await this.validationService.validationHospital(
    //   this.cnpj,
    //   this.razaosocial,
    //   this.nomefantasia
    // );
    // if (validacao.length === 0) {

    //   if (this.pacienteSelecionado) {
    //     console.log('salvando...')
    //     this.atualizarHospital();
    //   } else {
    //     const validacaoExisteHospital = await this.validationService.validationHospAdicionar(this.cnpj)

    //     if (validacaoExisteHospital.length === 0) {
    //       console.log('inserindo...')
    //       this.inserirHospital();
    //     } else {
    //       this.mensage = validacaoExisteHospital;
    //     }
    //   }
    // } else {
    //   this.mensage = validacao;
    // }
  }

  // atualizarHospital() {
  //   if (this.hospitalSelecionado) {
  //     this.newHospital.idHospital = this.hospitalSelecionado?.idHospital;
  //     this.newHospital.nomefantasia = this.nomefantasia
  //     this.newHospital.razaosocial = this.razaosocial;
  //     this.newHospital.cnpj = this.cnpj;
  //     this.newHospital.ativo = this.status;

  //     this.hospitalService.updateHospital(this.newHospital).subscribe({
  //       next: (res) => {
  //         alert('Hospital atualizado com sucesso!');
  //         this.addlog();
  //         this.router.navigate(['/hospitais']);
  //       },
  //       error: (err) => {
  //         console.error('Erro ao atualizar hospital:', err);
  //         alert('Erro ao atualizar hospital!');
  //       }
  //     });
  //   }

  // }

  // inserirHospital() {
  //   this.newHospital.nomefantasia = this.nomefantasia;
  //   this.newHospital.razaosocial = this.razaosocial;
  //   this.newHospital.cnpj = this.cnpj;
  //   this.newHospital.ativo = this.status;

  //   this.hospitalService.addHospital(this.newHospital).subscribe({
  //     next: (res) => {
  //       alert('Hospital cadastrado com sucesso!')
  //       this.addlog();
  //       this.router.navigate(['/hospitais']);
  //     },
  //     error: (err) => {
  //       console.error('Erro ao registrar hospital:', err);
  //       alert('Erro ao adicionar hospital!')
  //     }
  //   })
  // }
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

        this.logService.addlog(this.newLog, idprofissional, msg, new Date(), undefined,undefined ,this.newPaciente).subscribe({
          next: ((res) => res),
          error: (err) => {
            console.error('Erro ao registrar log:', err);
          }
        });
      }
    }
  }


  telaAnterior(){

    this.router.navigate(['/paciente'])


  }

}
