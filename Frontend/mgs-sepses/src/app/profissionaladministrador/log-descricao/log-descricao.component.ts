import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';
import { Profissional } from '../../models/profissional';
import { ProfissionalService } from '../../services/profissional.service';

@Component({
  selector: 'app-log-descricao',
  imports: [RouterLink, CommonModule],
  templateUrl: './log-descricao.component.html',
  styleUrl: './log-descricao.component.css'
})
export class LogDescricaoComponent {
  log: Log | undefined;
  profissional: Profissional | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly logService: LogService,
    private readonly profissionalService: ProfissionalService
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.logService.buscarLog(id).subscribe(log => {
        this.log = log;

        if (log?.idProfissional) {
          this.carregarDados(log.idProfissional);
        }
      });
    });

  }

  carregarDados(id: string) {
    this.profissionalService.getProfissional().subscribe((resp) => {
      this.profissional = resp.find(res => res.idProfissional === id);
    })
  }

}
