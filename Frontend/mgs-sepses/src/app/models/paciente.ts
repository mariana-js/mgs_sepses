export interface Paciente {
  id_paciente: string;
  nome: string;
  cpf: string;
  data_nascimento: Date;
  sexo: string;
  celular1: string;
  celular2: string;
  ativo: boolean;
  risco_sepse: string;
  data_alteracao: Date;
}
