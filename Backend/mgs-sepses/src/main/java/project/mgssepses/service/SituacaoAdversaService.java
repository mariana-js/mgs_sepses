package project.mgssepses.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.mgssepses.model.SituacaoAdversa;
import project.mgssepses.repository.SituacaoAdversaRepository;

@Service
public class SituacaoAdversaService {
    final SituacaoAdversaRepository situacaoAdversaRepository;

    public SituacaoAdversaService(SituacaoAdversaRepository situacaoAdversaRepository) {
        this.situacaoAdversaRepository = situacaoAdversaRepository;
    }


    @Transactional
    public SituacaoAdversa save(SituacaoAdversa situacaoAdversa){
        return situacaoAdversaRepository.save(situacaoAdversa);
    }

    public Optional<SituacaoAdversa> findById(UUID idSituacaoAdversa){
        return situacaoAdversaRepository.findById(idSituacaoAdversa);
    }

    public List<SituacaoAdversa> findAll(){
        return situacaoAdversaRepository.findAll();
    }

    public void delete(SituacaoAdversa situacaoAdversa){
        situacaoAdversaRepository.delete(situacaoAdversa);
    }
}
