import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-head',
  imports: [NgIf, RouterOutlet, RouterLink, NgClass],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {
 rotaAtual: string = '';

  constructor(private readonly router: Router) {
    this.router.events.subscribe(() => {
      this.rotaAtual = this.router.url; // Captura a rota atual
    });
  }
}
