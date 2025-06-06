import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { firstValueFrom, forkJoin, tap } from 'rxjs';
import { Enfermeiro } from '../../models/enfermeiro';
import { Log } from '../../models/log';
import { Medico } from '../../models/medico';
import { Profissional } from '../../models/profissional';
import { ConexaoService } from '../../services/conexao.service';
import { EnfermeiroService } from '../../services/enfermeiro.service';
import { LogService } from '../../services/log.service';
import { MedicoService } from '../../services/medico.service';
import { ProfissionalService } from '../../services/profissional.service';
import { ValidationService } from '../../services/validation.service';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../models/hospital';

@Component({
  selector: 'app-gerenciar-usuario',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterOutlet, NgIf, NgFor],
  templateUrl: './gerenciar-usuario.component.html',
  styleUrl: './gerenciar-usuario.component.css'
})
export class GerenciarUsuarioComponent {
  codProfissional: string = '';
  id: string = '';
  idHospital: string = '';
  nome: string = '';
  email: string = '';
  cpf: string = '';
  estado: string = '';
  senha: string = '';
  codigo: string = '';
  profissional: string = '';
  nomeHospital: string = 'Selecionar hospital';
  status: boolean = true;
  save: boolean = true;

  hospitais: Hospital[] = [];
  enfermeiro: Enfermeiro[] = [];
  hospital: Hospital[] = [];
  medico: Medico[] = [];
  mensage: string[] = [];
  usuario: Profissional | undefined;

  msgStatus: string = '';
  prof: boolean = false;
  hosp: boolean = false;
  st: boolean = false;

  profissionalSelecionado: Profissional | undefined;

  newUsuario: Profissional = {
    idHospital: '',
    idProfissional: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    estado: '',
    status: true,
    admin: false

  }

  newMedico: Medico = {
    idprofissional: '',
    crm: ''
  }

  newEnfermeiro: Enfermeiro = {
    idprofissional: '',
    coren: ''
  }
  newLog: Log = {
    idLog: '',
    idProfissional: '',
    data: new Date(),
    descricao: ''
  }
  constructor(
    private readonly profissionalService: ProfissionalService,
    private readonly medicoService: MedicoService,
    private readonly enfermeiroService: EnfermeiroService,
    private readonly conexaoService: ConexaoService,
    private readonly logService: LogService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly validationService: ValidationService,
    private readonly hospitalService: HospitalService

  ) {

    this.route.params.subscribe(params => {
      const id = params['id'];

      this.profissionalService.buscarProfissionalId(id).subscribe(prof => {
        this.profissionalSelecionado = prof;
        if (this.profissionalSelecionado) {
          this.carregarDadosSelecionado();
        }
      });



    });
  }

  ngOnInit() {
    if (!this.profissionalSelecionado) this.listaHospitais();
  }

  carregarDadosSelecionado() {
    if (this.profissionalSelecionado) {
      this.id = this.profissionalSelecionado.idProfissional;
      this.idHospital = this.profissionalSelecionado.idHospital;
      this.nome = this.profissionalSelecionado.nome;
      this.email = this.profissionalSelecionado.email;
      this.cpf = this.profissionalSelecionado.cpf;
      this.estado = this.profissionalSelecionado.estado;
      this.senha = this.profissionalSelecionado.senha;

      if (this.profissionalSelecionado.admin === true) this.profissional = "Administrador"
      else {
        this.enfermeiroService.getEnfermeiro().subscribe(enfermeiros => {
          const enfermeiro = enfermeiros.find(res => res.idprofissional === this.id);

          if (enfermeiro) {
            this.profissional = 'Enfermeiro(a)';
            this.codigo = enfermeiro.coren;
          } else {

            this.medicoService.getMedico().subscribe(medicos => {
              const medico = medicos.find(res => res.idprofissional === this.id);

              if (medico) {
                this.profissional = 'Médico(a)';
                this.codigo = medico.crm;
              } else {
                this.profissional = 'Profissão não encontrada';
              }
            });
          }
        });

      }
      this.status = this.profissionalSelecionado.status
      if (this.status === true) this.msgStatus = "Status: Ativo";
      else this.msgStatus = "Status: Desativado";

      this.buscarHospitalId(this.profissionalSelecionado.idHospital);

    }

  }
  buscarHospitalId(id: string) {
    this.hospitalService.buscarHospitalId(id)
      .subscribe(hospital => {
        this.nomeHospital = hospital?.razaosocial || '';
      });

  }
  selecionarHospital(id: string) {
    this.idHospital = id;
    this.buscarHospitalId(id);
    // console.log("Id: ", this.idHospital, "Razao: ", this.nomeHospital)
    this.hosp = !this.hosp;
  }
  async salvar() {
    const validacao = await this.validationService.validationProfissional(
      this.idHospital,
      this.cpf,
      this.senha,
      this.nome,
      this.email,
      this.profissional,
      this.codigo,
      this.estado
    );

    if (validacao.length === 0) {
      if (this.profissionalSelecionado) {
        console.log('atualizando...');
        this.atualizarProfissional();
      } else {
        const validacaoExisteProfissional = await this.validationService.validationProfAdicionar(this.cpf);

        if (validacaoExisteProfissional.length === 0) {
          console.log('inserindo...');
          this.inserirProfissional();
        } else {
          this.mensage = validacaoExisteProfissional;
        }
      }
    } else {
      this.mensage = validacao;
    }
  }
  listaHospitais() {
    this.hospitalService.getHospital().subscribe(res => {
      this.hospital = res;
      // console.log('Hospitais: ', this.hospital)
    })
  }
  atualizarProfissional() {
    const conexao = this.conexaoService.getProfissional();
    if (conexao) {
      this.newUsuario.idProfissional = this.profissionalSelecionado!.idProfissional;
      this.newUsuario.idHospital = this.idHospital;
      this.newUsuario.nome = this.nome;
      this.newUsuario.email = this.email;
      this.newUsuario.cpf = this.cpf;
      this.newUsuario.senha = this.senha;
      this.newUsuario.estado = this.estado;
      this.newUsuario.status = this.status;
      console.log("Status: ", this.status)

      if (this.profissional === 'Administrador' || this.profissional === 'admin') {
        this.newUsuario.admin = true;
        this.enviarAtualizacao();
      } else {
        this.newUsuario.admin = false;

        forkJoin({
          enfermeiros: this.enfermeiroService.getEnfermeiro(),
          medicos: this.medicoService.getMedico()
        }).subscribe(({ enfermeiros, medicos }) => {
          const isEnfermeiro = enfermeiros.find(e => e.idprofissional === this.newUsuario.idProfissional);
          const isMedico = medicos.find(m => m.idprofissional === this.newUsuario.idProfissional);

          if (isMedico) {
            this.profissional = 'medico';
          } else if (isEnfermeiro) {
            this.profissional = 'enfermeiro';
          } else {
            this.profissional = 'erro';
          }

          this.enviarAtualizacao();
        });
      }
    }
  }

  enviarAtualizacao() {
    this.profissionalService.updateProfissional(this.newUsuario).subscribe({
      next: (res) => {
        const idUsuario = res.idProfissional;
        if (this.profissional === 'medico') this.atualizarMedico();
        if (this.profissional === 'enfermeiro') this.atualizarEnfermeiro();
        alert('Usuário atualizado com sucesso!');
        this.addlog();
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Erro ao atualizar profissional:', err);
        alert('Erro ao atualizar usuário!');
      }
    });
  }
  atualizarMedico() {
    this.newMedico.idprofissional = this.newUsuario.idProfissional
    this.newMedico.crm = this.codigo;

    this.medicoService.updateMedico(this.newMedico).subscribe({
      next: (res) => res,
      error: (err) => {
        console.error('Erro ao atualizar medico:', err);
      }
    });
  }
  atualizarEnfermeiro() {
    this.newEnfermeiro.idprofissional = this.newUsuario.idProfissional;
    this.newEnfermeiro.coren = this.codigo;

    this.enfermeiroService.updateEnfermeiro(this.newEnfermeiro).subscribe({
      next: (res) => res,
      error: (err) => {
        console.error('Erro ao atualizar enfermeiro:', err);
      }
    });

  }

  inserirProfissional() {
    const conexao = this.conexaoService.getProfissional();
    if (conexao) {

      this.newUsuario.idHospital = this.idHospital;
      this.newUsuario.nome = this.nome;
      this.newUsuario.email = this.email;
      this.newUsuario.cpf = this.cpf;
      this.newUsuario.senha = this.senha;
      this.newUsuario.estado = this.estado;
      this.newUsuario.status = this.status;

      if (this.profissional === 'admin') {
        this.newUsuario.admin = true;
      }

      this.profissionalService.addProfissional(this.newUsuario).subscribe({
        next: (res) => {
          const idUsuario = res.idProfissional
          if (this.profissional === 'medico') this.inserirMedico(idUsuario);
          if (this.profissional === 'enfermeiro') this.inserirEnfermeiro(idUsuario);
          alert('Usuário adicionado com sucesso!')
          this.addlog();
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('Erro ao registrar profissional:', err);
          alert('Erro ao adicionar usuário!')
        }
      });
    }


  }
  inserirMedico(id: string) {
    if (id !== undefined) {
      this.newMedico.idprofissional = id;
      this.newMedico.crm = this.codigo;
      this.medicoService.addMedico(this.newMedico).subscribe({
        next: (res) => res,
        error: (err) => {
          console.error('Erro ao registrar medico:', err);
        }
      });

    }


  }
  inserirEnfermeiro(id: string) {
    if (id !== undefined) {
      this.newEnfermeiro.idprofissional = id;
      this.newEnfermeiro.coren = this.codigo;
      this.enfermeiroService.addEnfermeiro(this.newEnfermeiro).subscribe({
        next: (res) => res,
        error: (err) => {
          console.error('Erro ao registrar enfermeiro:', err);
          alert('Erro ao adicionar o enfermeiro')
        }
      });

    }

  }

  addlog() {
    let msg = '';
    if (this.profissionalSelecionado) {

      msg = 'atualizar-usuario'
    } else {
      msg = 'cadastro-usuario'
    }
    if (this.conexaoService) {
      const idprofissional = this.conexaoService.getProfissional();
      if (idprofissional) {
        this.newLog.idProfissional = idprofissional.idProfissional;

        this.logService.addlog(this.newLog, idprofissional, msg, new Date(), this.newUsuario).subscribe({
          next: ((res) => res),
          error: (err) => {
            console.error('Erro ao registrar log:', err);
          }
        });
      }
    }
  }
  telaAnterior() {
    if (this.profissionalSelecionado) this.router.navigate(['/usuarios'])
    else this.router.navigate(['/outras-opcoes'])

  }
  // deletar() {
  //   const id = this.profissionalSelecionado?.idProfissional;

  //   forkJoin({
  //     enfermeiros: this.enfermeiroService.getEnfermeiro(),
  //     medicos: this.medicoService.getMedico()
  //   }).subscribe(({ enfermeiros, medicos }) => {
  //     const enfer = enfermeiros.find(r => r.idprofissional === id);
  //     const med = medicos.find(r => r.idprofissional === id);


  //     if (confirm(`Deseja excluir o usuário ${this.profissionalSelecionado?.nome}?`)) {
  //       if (!this.profissionalSelecionado?.admin && id) {

  //         console.log(enfer, med)
  //         if (enfer) {
  //           this.deletarEnfermeiro(id)
  //         } else if (med) {
  //           this.deletarMedico(id)
  //         }

  //         this.deletarUsuario(id);

  //       } else if (id) {
  //         this.deletarUsuario(id);
  //       }
  //       alert('Usuário excluído com sucesso!')
  //       this.router.navigate(['/usuarios'])

  //     }

  //   });
  // }
  // deletarUsuario(id: string) {
  //   this.profissionalService.deleteProfissional(id).subscribe({
  //     next: (res) => {
  //       console.log('Profissional deletado com sucesso');
  //     },
  //     error: (err) => {
  //       console.error('Erro ao deletar profissional:', err);

  //       if (err.status === 500 && err.error?.includes('dados_clinicos')) {
  //         alert('Não é possível excluir este profissional pois ele possui dados clínicos vinculados.');
  //       } else {
  //         alert('Erro ao excluir profissional.');
  //       }
  //     }
  //   });
  // }
  // deletarMedico(id: string) {
  //   this.medicoService.deleteMedico(id).subscribe({
  //     next: ((res) => res),
  //     error: (err) => {
  //       console.error('Erro ao deletar medico:', err)
  //     }
  //   })
  // }
  // deletarEnfermeiro(id: string) {
  //   this.enfermeiroService.deleteEnfermeiro(id).subscribe({
  //     next: ((res) => res),
  //     error: (err) => {
  //       console.error('Erro ao deletar enfermeiro:', err)
  //     }
  //   })
  // }
}
