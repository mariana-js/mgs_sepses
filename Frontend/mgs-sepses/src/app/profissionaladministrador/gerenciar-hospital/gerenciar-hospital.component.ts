import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HosProf } from '../../models/hos-prof';
import { Hospital } from '../../models/hospital';
import { Log } from '../../models/log';
import { ConexaoService } from '../../services/conexao.service';
import { HosProfService } from '../../services/hos-prof.service';
import { HospitalService } from '../../services/hospital.service';
import { LogService } from '../../services/log.service';
import { ValidationService } from '../../services/validation.service';


@Component({
  selector: 'app-gerenciar-hospital',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterOutlet, RouterLink, NgIf],
  templateUrl: './gerenciar-hospital.component.html',
  styleUrl: './gerenciar-hospital.component.css'
})
export class GerenciarHospitalComponent {
  idHospitalSelecionado: string = '';
  razaosocial: string = '';
  nomefantasia: string = '';
  cnpj: string = '';
  status: boolean = true;
  st: boolean = false;
  msgStatus: string = '';
  hospitalSelecionado: Hospital | undefined;
  mensage: string[] = [];
  hosprof: HosProf[] = [];
  possuiProfCadastrado: boolean = false;

  newHospital: Hospital = {
    idHospital: '',
    razaosocial: '',
    nomefantasia: '',
    cnpj: '',
    ativo: true
  }
  newLog: Log = {
    idLog: '',
    idProfissional: '',
    data: new Date(),
    descricao: ''
  }

  constructor(
    private readonly router: Router,
    private readonly hospitalService: HospitalService,
    private readonly conexaoService: ConexaoService,
    private readonly route: ActivatedRoute,
    private readonly logService: LogService,
    private readonly validationService: ValidationService,
    private readonly hosProfService: HosProfService
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.hospitalService.buscarHospitalId(id).subscribe(hosp => {
        this.hospitalSelecionado = hosp;
        if (this.hospitalSelecionado) this.carregarDadosSelecionado();
      });
    });

  }

  verificarHospital(id: string): void {
    this.hosProfService.getHosProf().subscribe(resp => {
      this.hosprof = resp;
      const verificarExistenciaProfHosp = this.hosprof.find(prof => prof.idhospital === id);
      if (verificarExistenciaProfHosp) this.possuiProfCadastrado = true;
    });
  }
  carregarDadosSelecionado() {
    if (this.hospitalSelecionado) {
      this.idHospitalSelecionado = this.hospitalSelecionado.idHospital;
      this.razaosocial = this.hospitalSelecionado?.razaosocial;
      this.nomefantasia = this.hospitalSelecionado?.nomefantasia
      this.cnpj = this.hospitalSelecionado?.cnpj
      this.status = this.hospitalSelecionado?.ativo

      this.verificarHospital(this.hospitalSelecionado?.idHospital);

      if (this.status) this.msgStatus = "Status: Ativo"
      else this.msgStatus = "Status: Desativado"
    }
  }
  async salvar() {

    const validacao = await this.validationService.validationHospital(
      this.cnpj,
      this.razaosocial,
      this.nomefantasia
    );
    if (validacao.length === 0) {

      if (this.hospitalSelecionado) {
        console.log('salvando...')
        this.atualizarHospital();
      } else {
        const validacaoExisteHospital = await this.validationService.validationHospAdicionar(this.cnpj)

        if (validacaoExisteHospital.length === 0) {
          console.log('inserindo...')
          this.inserirHospital();
        } else {
          this.mensage = validacaoExisteHospital;
        }
      }
    } else {
      this.mensage = validacao;
    }
  }



  atualizarHospital() {
    if (this.hospitalSelecionado) {
      this.newHospital.idHospital = this.hospitalSelecionado?.idHospital;
      this.newHospital.nomefantasia = this.nomefantasia
      this.newHospital.razaosocial = this.razaosocial;
      this.newHospital.cnpj = this.cnpj;
      this.newHospital.ativo = this.status;

      this.hospitalService.updateHospital(this.newHospital).subscribe({
        next: (res) => {
          alert('Hospital atualizado com sucesso!');
          this.addlog();
          this.router.navigate(['/hospitais']);
        },
        error: (err) => {
          console.error('Erro ao atualizar hospital:', err);
          alert('Erro ao atualizar hospital!');
        }
      });
    }

  }

  inserirHospital() {
    this.newHospital.nomefantasia = this.nomefantasia;
    this.newHospital.razaosocial = this.razaosocial;
    this.newHospital.cnpj = this.cnpj;
    this.newHospital.ativo = this.status;

    this.hospitalService.addHospital(this.newHospital).subscribe({
      next: (res) => {
        alert('Hospital cadastrado com sucesso!')
        this.addlog();
        this.router.navigate(['/hospitais']);
      },
      error: (err) => {
        console.error('Erro ao registrar hospital:', err);
        alert('Erro ao adicionar hospital!')
      }
    })
  }
  addlog() {
    let msg = '';
    if (this.hospitalSelecionado) {
      msg = 'atualizar-hospital'
    } else {
      msg = 'cadastro-hospital'
    }
    if (this.conexaoService) {
      const idprofissional = this.conexaoService.getProfissional();
      if (idprofissional) {
        this.newLog.idProfissional = idprofissional.idProfissional;

        this.logService.addlog(this.newLog, idprofissional, msg, new Date(), undefined, this.newHospital).subscribe({
          next: ((res) => res),
          error: (err) => {
            console.error('Erro ao registrar log:', err);
          }
        });
      }
    }
  }
}
