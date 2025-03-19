package project.mgssepses.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.mgssepses.model.Medico;
import project.mgssepses.repository.MedicoRepository;

@Service
public class MedicoService {
    final MedicoRepository medicoRepository;

    public MedicoService(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    @Transactional
    public Medico save(Medico medico){
        return medicoRepository.save(medico);
    }

    public Optional<Medico> findById(UUID idMedico){
        return medicoRepository.findById(idMedico);
    }
    
    public List<Medico> findAll(){
        return medicoRepository.findAll();
    }

    public void delete(Medico medico){
        medicoRepository.delete(medico);
    }
}
