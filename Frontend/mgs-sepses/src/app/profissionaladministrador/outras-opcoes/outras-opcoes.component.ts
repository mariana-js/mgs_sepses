import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-outras-opcoes',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './outras-opcoes.component.html',
  styleUrl: './outras-opcoes.component.css'
})
export class OutrasOpcoesComponent {

}
