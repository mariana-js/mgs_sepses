import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Hospital } from '../../models/hospital';
import { HospitalService } from '../../services/hospital.service';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-hospitais',
  imports: [CommonModule, HttpClientModule, NgFor, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './lista-hospitais.component.html',
  styleUrl: './lista-hospitais.component.css'
})
export class ListaHospitaisComponent {
  razao: string = '';
  newHospitalPesquisa: Hospital[] = [];
  hospital: Hospital[] = [];
  hospitalOriginal: Hospital[] = [];

  constructor(
    private readonly hospitalService: HospitalService,
    private readonly router: Router) { }

  ngOnInit() {
    this.listarHospitais();
  }

  listarHospitais() {
    this.hospitalService.getHospital().subscribe(resp => {
      this.hospital = resp;
      this.hospitalOriginal = [...this.hospital];
    });
    this.hospital = this.hospital.sort((a, b) => a.razaosocial.localeCompare(b.razaosocial));

  }


  pesquisar(razao: string) {
    if (!razao || razao.trim() === '') {
      this.newHospitalPesquisa = [];
      this.hospital = [...this.hospitalOriginal];
      return;
    }

    const termo = razao.trim().toLowerCase();
    this.newHospitalPesquisa = this.hospital.filter(p =>
      p.razaosocial.toLowerCase().includes(termo)
    );
    this.hospital = this.newHospitalPesquisa;
  }

}
