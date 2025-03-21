import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-lista-logs',
  imports: [CommonModule, HttpClientModule, NgFor, FormsModule],
  templateUrl: './lista-logs.component.html',
  styleUrl: './lista-logs.component.css'
})
export class ListaLogsComponent {
  data: string = '';
  log: Log[] = [];
  logsFiltrados: Log[] = [];
  buscou: boolean = false;
  constructor(
    private readonly logService: LogService,
    private readonly router: Router) {}

  ngOnInit() {
    this.listaLogs();
  }
  listaLogs() {
    this.logService.getLog().subscribe(resp => {
      this.log = resp;
    });
  }
  pesquisar(data: string) {
    this.buscou = true;
    if (!data) {
      this.logsFiltrados = [...this.log]; // mostra tudo se o campo for limpo
      return;
    }

    const dataFormatada = new Date(data).toISOString().split('T')[0]; // garante o formato 'YYYY-MM-DD'

    this.logsFiltrados = this.log.filter(log =>
      new Date(log.data).toISOString().startsWith(dataFormatada)
    );
  }
}
