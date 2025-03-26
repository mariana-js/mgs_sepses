import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ConexaoService } from '../services/conexao.service';

@Component({
  selector: 'app-head',
  imports: [NgIf, RouterOutlet, RouterLink, NgClass],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {
  rotaAtual: string = '';

  constructor(private readonly router: Router, private readonly conexao: ConexaoService) {
    this.router.events.subscribe(() => {
      this.rotaAtual = this.router.url; // Captura a rota atual
    });
  }

  sair() {
    this.conexao.limpar();
    this.router.navigate(['/login'])
  }
}
