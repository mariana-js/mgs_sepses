import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CriptografiaService {
  senha: string = '';
  senhaCriptografada: string = '';
  constructor() { }


  criptografarSenha(senha: string) : string{
    return senha;
  }

  descriptografarSenha(senha: string): string{
    return senha;
  }
}
