import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HosProf } from '../models/hos-prof';
import { Hospital } from '../models/hospital';
import { ConexaoService } from '../services/conexao.service';
import { HosProfService } from '../services/hos-prof.service';
import { HospitalService } from '../services/hospital.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  rotaAtual: string = '';
  hospitais: Hospital[] = [];
  hosprofs: HosProf[] = [];
  hospitalSelecionado: Hospital | undefined;

  constructor(
    private readonly router: Router,
    private readonly hospitalService: HospitalService,
    private readonly hosprofService: HosProfService,
    private readonly conexaoService: ConexaoService
  ) {
    this.router.events.subscribe(() => {
      this.rotaAtual = this.router.url; // Captura a rota atual
    });
  }

  ngOnInit() {
    this.buscarHospitais();
  }
  selecionarHospital(hospital: Hospital) {
    this.hospitalSelecionado = hospital;
    this.conexaoService.setHospital(this.hospitalSelecionado)
    
    window.location.reload();
    //
    // console.log('SALVOU hospital:', hospital);
    // console.log('localStorage conexao:', localStorage.getItem('conexao'));
  }

  buscarHospitais() {
    const conexao = this.conexaoService.getProfissional();
    if (conexao) {
      this.hosprofService.buscarHosProfIdProfissional(conexao?.idProfissional).subscribe({
        next: (res) => {
          this.hosprofs = res;

          for (const h of this.hosprofs) {
            this.hospitalService.buscarListaHospitaisId(h.idhospital).subscribe({
              next: (hospitais: Hospital[]) => {
                if (hospitais?.length) this.hospitais.push(...hospitais);
              },
              error: (err) => console.error('Erro ao buscar hospital por id:', err)
            });
          }
        },
        error: (err) => {
          console.error('Erro ao trazer hospitais do profissional: ', err)
        }
      });
    }

  }


}
