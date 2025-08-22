import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Enfermeiro } from '../../models/enfermeiro';
import { HosProf } from '../../models/hos-prof';
import { Hospital } from '../../models/hospital';
import { Log } from '../../models/log';
import { Medico } from '../../models/medico';
import { Profissional } from '../../models/profissional';
import { ConexaoService } from '../../services/conexao.service';
import { EnfermeiroService } from '../../services/enfermeiro.service';
import { HosProfService } from '../../services/hos-prof.service';
import { HospitalService } from '../../services/hospital.service';
import { LogService } from '../../services/log.service';
import { MedicoService } from '../../services/medico.service';
import { ProfissionalService } from '../../services/profissional.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-gerenciar-usuario',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterOutlet, NgIf, NgFor, RouterLink],
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
  listaHospitaisSelecionados: Hospital[] = [];
  listaHosProfs: HosProf[] = [];
  listaHospitaisAdicionados: string[] = [];

  // Guardando ids do hosprof para excluir ao salvar
  listaRetirarHosProfs: string[] = [];
  usuario: Profissional | undefined;

  msgStatus: string = '';
  prof: boolean = false;
  hosp: boolean = false;
  st: boolean = false;

  profissionalSelecionado: Profissional | undefined;

  newUsuario: Profissional = {
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

  newHosProf: HosProf = {
    id: '',
    idprofissional: '',
    idhospital: ''
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
    private readonly hospitalService: HospitalService,
    private readonly hosProfService: HosProfService

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
  } ngOnInit() {
    this.listaHospitais();
  } addHospitalnaLista(id: string) {
    const jaInserido = this.listaHospitaisAdicionados.find(idlista => idlista === id);

    if (!jaInserido) {
      this.listaHospitaisAdicionados.push(id);
      this.listaHospitaisAdd();
    }

  } retirandoHospitaldaLista(id: string) {
    this.listaRetirarHosProfs.push(id);

    this.listaHospitaisAdicionados = this.listaHospitaisAdicionados.filter(idlista => idlista !== id);

    this.listaHospitaisAdd();

  } limparListadeHospitaisSelecionados() {
    this.listaHospitaisAdicionados = [];
  } listaHospitaisAdd() {
    this.listaHospitaisSelecionados = [];
    for (const id of this.listaHospitaisAdicionados) {
      if (this.listaHospitaisAdicionados.filter(r => r === id)) {
        this.hospitalService.getHospital().subscribe(res => {
          const encontrados = res.filter(r => r.idHospital === id);
          this.listaHospitaisSelecionados.push(...encontrados);
        });

      } else {
        alert('Item já adicionado a lista')
      }
    }
  } carregarDadosSelecionado() {
    if (this.profissionalSelecionado) {
      this.id = this.profissionalSelecionado.idProfissional;
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
      // Exibir lista de hospitais que o usuário tem acesso:
      this.hosProfService.buscarHosProfIdProfissional(this.id).subscribe({
        next: (res) => {
          this.listaHosProfs = res ?? [];

          this.listaHospitaisAdicionados = this.listaHosProfs.map(h => h.idhospital);

          this.listaHospitaisAdd();
        },
        error: (err) => console.error('Erro ao buscar HosProf:', err)
      })

      this.status = this.profissionalSelecionado.status
      if (this.status === true) this.msgStatus = "Status: Ativo";
      else this.msgStatus = "Status: Desativado";

    }

  } async salvar() {
  const idAtual = this.profissionalSelecionado?.idProfissional ?? undefined;

  // 1) Campos obrigatórios / regras básicas
  const basica = await this.validationService.validationProfissional(
    this.cpf, this.senha, this.nome, this.email,
    this.profissional, this.codigo, this.estado
  );
  if (basica.length) { this.mensage = basica; return; }

  // 2) Unicidade de CPF/Email (ignora o próprio registro se idAtual existir)
  const duplicadosGerais = await this.validationService
    .validationEmailCpf(this.cpf, this.email, idAtual);
  if (duplicadosGerais.length) { this.mensage = duplicadosGerais; return; }

  // 3) Unicidade específica por tipo
  if (this.profissional === 'enfermeiro') {
    const errosEnf = await this.validationService
      .validationEnfermeiro(this.codigo, idAtual);
    if (errosEnf.length) { this.mensage = errosEnf; return; }
  }

  if (this.profissional === 'medico') {
    const errosMed = await this.validationService
      .validationMedico(this.codigo, idAtual);
    if (errosMed.length) { this.mensage = errosMed; return; }
  }

  // 4) Decide inserir ou atualizar
  if (idAtual) {
    await this.atualizarProfissional();
  } else {
    await this.inserirProfissional();
  }
}

  listaHospitais() {
    this.hospitalService.getHospital().subscribe(res => {
      this.hospital = res;
    });
  } atualizarProfissional() {
    const conexao = this.conexaoService.getProfissional();
    if (conexao) {
      this.newUsuario.idProfissional = this.profissionalSelecionado!.idProfissional;
      this.newUsuario.nome = this.nome;
      this.newUsuario.email = this.email;
      this.newUsuario.cpf = this.cpf;
      this.newUsuario.senha = this.senha;
      this.newUsuario.estado = this.estado;
      this.newUsuario.status = this.status;

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
  } enviarAtualizacao() {
    this.profissionalService.updateProfissional(this.newUsuario).subscribe({
      next: (res) => {

        if (this.profissional === 'medico') this.atualizarMedico();
        if (this.profissional === 'enfermeiro') this.atualizarEnfermeiro();
        alert('Usuário atualizado com sucesso!');
        this.addlog();
        this.router.navigate(['/gerenciar-usuario', this.id]);

      },
      error: (err) => {
        console.error('Erro ao atualizar profissional:', err);
        alert('Erro ao atualizar usuário!');
      }
    });

    if (this.listaRetirarHosProfs.length > 0) {
      for (const hospital of this.listaRetirarHosProfs) {
        this.hosProfService.getHosProfIdProfHosp(hospital, this.id).subscribe(res => {
          if (res) {
            if (res?.id) {
              this.deleteHosProf(res.id);
            }
          }
        })
      }
    }
    if (this.listaHospitaisSelecionados.length > 0) {
      for (const hospital of this.listaHospitaisSelecionados) {
        this.hosProfService.getHosProfIdProfHosp(hospital.idHospital, this.id).subscribe(res => {

          if (!res) {
            this.newHosProf.idhospital = hospital.idHospital;
            this.newHosProf.idprofissional = this.id;
            this.addHosProf();

          } else {
            console.log('Já adicionado a lista!')
          }
        })

      }
    }

  } atualizarMedico() {
    this.newMedico.idprofissional = this.newUsuario.idProfissional
    this.newMedico.crm = this.codigo;

    this.medicoService.updateMedico(this.newMedico).subscribe({
      next: (res) => res,
      error: (err) => {
        console.error('Erro ao atualizar medico:', err);
      }
    });
  } atualizarEnfermeiro() {
    this.newEnfermeiro.idprofissional = this.newUsuario.idProfissional;
    this.newEnfermeiro.coren = this.codigo;

    this.enfermeiroService.updateEnfermeiro(this.newEnfermeiro).subscribe({
      next: (res) => res,
      error: (err) => {
        console.error('Erro ao atualizar enfermeiro:', err);
      }
    });

  } inserirProfissional() {
    const conexao = this.conexaoService.getProfissional();
    if (conexao) {

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
          if (this.profissional !== 'admin') {
            if (this.listaHospitaisSelecionados.length !== 0) {
              // listaHospitaisSelecionados
              for (const hospital of this.listaHospitaisSelecionados) {
                this.newHosProf.idhospital = hospital.idHospital;
                this.newHosProf.idprofissional = idUsuario;
                this.addHosProf();

              }
            }
          }
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


  } inserirMedico(id: string) {
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


  } inserirEnfermeiro(id: string) {
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

  } addlog() {
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
  } addHosProf() {
    this.hosProfService.addHosProf(this.newHosProf).subscribe({
      next: (res) => res,
      error: (err) => {
        console.error('Erro ao registrar hosProf:', err);
      }
    });

  } deleteHosProf(id: string) {
    this.hosProfService.deleteHosProf(id).subscribe({
      next: ((res) => res),
      error: (err) => {
        console.error('Erro ao deletar hosprof:', err)
      }
    })
  } telaAnterior() {
    if (this.profissionalSelecionado) this.router.navigate(['/usuarios'])
    else this.router.navigate(['/outras-opcoes'])

  }

}
