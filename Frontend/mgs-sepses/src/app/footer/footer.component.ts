import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  rotaAtual: string = '';

  constructor(private readonly router: Router) {
    this.router.events.subscribe(() => {
      this.rotaAtual = this.router.url; // Captura a rota atual
    });
  }
}
