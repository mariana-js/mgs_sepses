export interface Profissional {
  id_hospital: string;
  id_profissional: string;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  estado: string;
  status: boolean;
  admin: boolean; /* Se true = administrador senão = profissional da saude */
}
