export interface DadosClinicos {
  id: string;
  idPaciente: string;
  idProfissional: string | undefined;
  data?: string; // opcional, pois tem valor default no banco
  relacaoP02Fi02: string;
  plaquetas: string;
  diurese: string;
  creatinina: string;
  glasgow: string;
  ep: string;
  norepinefrina: string;
  dobutamina: string;
  dopamina: string;
  pam: string;
  bilirrubina: string;
}
