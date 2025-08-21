package project.mgssepses.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.mgssepses.model.DadosClinicos;
import project.mgssepses.repository.DadosClinicosRepository;

@Service
public class SofaCalculatorService {
    final DadosClinicosRepository dadosClinicosRepository;

    public DadosClinicosService(DadosClinicosRepository dadosClinicosRepository) {
        this.dadosClinicosRepository = dadosClinicosRepository;
    }

    @Transactional
    public DadosClinicos save(DadosClinicos dadosClinicos){
        return dadosClinicosRepository.save(dadosClinicos);
    }

    public Optional<DadosClinicos> findById(UUID idDadosClinicos){
        return dadosClinicosRepository.findById(idDadosClinicos);
    }

    public List<DadosClinicos> findAll(){
        return dadosClinicosRepository.findAll();
    }

    public void delete(DadosClinicos dadosClinicos){
        dadosClinicosRepository.delete(dadosClinicos);
    }
}
