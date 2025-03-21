export interface DadosClinicos {
  id: string;
  id_paciente: string;
  idProfissional: string;
  data?: string; // opcional, pois tem valor default no banco
  relacaoP02Fi02?: string;
  plaquetas?: string;
  diurese?: string;
  creatinina?: string;
  glasgow?: string;
  ep?: string;
  norepinefrina?: string;
  dobutamina?: string;
  dopamina?: string;
  pam?: string;
  bilirrubina?: string;
}
