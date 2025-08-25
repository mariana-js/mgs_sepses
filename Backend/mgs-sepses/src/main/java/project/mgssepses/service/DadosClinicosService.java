package project.mgssepses.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import project.mgssepses.model.DadosClinicos;
import project.mgssepses.model.Paciente;
import project.mgssepses.model.RiscoSepse;
import project.mgssepses.repository.DadosClinicosRepository;
import project.mgssepses.repository.PacienteRepository;

@Service
public class DadosClinicosService {

    final DadosClinicosRepository dadosClinicosRepository;
    private final SofaCalculatorService sofaService;
    private final RiscoSepseService riscoService;
    private final PacienteRepository pacienteRepository;

    public DadosClinicosService(
            DadosClinicosRepository dadosClinicosRepository,
            SofaCalculatorService sofaService,
            RiscoSepseService riscoService,
            PacienteRepository pacienteRepository) {
        this.dadosClinicosRepository = dadosClinicosRepository;
        this.sofaService = sofaService;
        this.riscoService = riscoService;
        this.pacienteRepository = pacienteRepository;
    }

    @Transactional
    public DadosClinicos save(DadosClinicos dadosClinicos) {
        dadosClinicos.setData(LocalDateTime.now());
        DadosClinicos saved = dadosClinicosRepository.save(dadosClinicos);

        // 2) Calcula o percentual de risco de SEPSE (apenas pelo SOFA; basal=0 se desconhecido)
        String riscoPercent = sofaService.calcularPercentualRiscoSepse(
                safe(saved.getRelacaoP02Fi02()), // RELACAOP02FI02
                safe(saved.getPlaquetas()), // PLAQUETAS
                safe(saved.getBilirrubina()), // BILIRRUBINA
                safe(saved.getPam()), // PAM
                safe(saved.getNorepinefrina()), // NOREPINEFRINA
                safe(saved.getDobutamina()), // DOBUTAMINA
                safe(saved.getDopamina()), // DOPAMINA
                safe(saved.getGlasgow()), // GLASGOW
                safe(saved.getCreatinina()), // CREATININA
                safe(saved.getDiurese()), // DIURESE
                safe(saved.getEp()), // EP ("SIM" se em suporte ventilatório)
                0 // SOFA basal (0 se desconhecido)
        );

        // 3) Monta a entity RiscoSepse e usa riscoService.save(RiscoSepse)
        RiscoSepse risco = new RiscoSepse();
        // id é @GeneratedValue — não setar
        risco.setIdpaciente(saved.getIdPaciente());
        risco.setRisco(riscoPercent);
        risco.setData(LocalDateTime.now());

        riscoService.save(risco);

        // 3) Atualiza PACIENTE com o risco
        Paciente paciente = pacienteRepository.findById(saved.getIdPaciente())
                .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado"));

        paciente.setRiscoSepse(riscoPercent);
        paciente.setDataAlteracao(LocalDateTime.now());
        pacienteRepository.save(paciente);

        return saved;
    }

    // Tansformando null em uma string vazia
    private static String safe(String s) {
        return (s == null ? "" : s);
    }

    public Optional<DadosClinicos> findById(UUID idDadosClinicos) {
        return dadosClinicosRepository.findById(idDadosClinicos);
    }

    public List<DadosClinicos> findAll() {
        return dadosClinicosRepository.findAll();
    }

    public void delete(DadosClinicos dadosClinicos) {
        dadosClinicosRepository.delete(dadosClinicos);
    }
}
