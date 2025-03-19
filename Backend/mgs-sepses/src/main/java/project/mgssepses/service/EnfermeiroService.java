package project.mgssepses.service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.mgssepses.model.Enfermeiro;
import project.mgssepses.repository.EnfermeiroRepository;

@Service
public class EnfermeiroService {
    final EnfermeiroRepository enfermeiroRepository;

    public EnfermeiroService(EnfermeiroRepository enfermeiroRepository) {
        this.enfermeiroRepository = enfermeiroRepository;
    }

    @Transactional
    public Enfermeiro save(Enfermeiro enfermeiro){
        return enfermeiroRepository.save(enfermeiro);
    }

    public Optional<Enfermeiro> findById(UUID idEnfermeiro){
        return enfermeiroRepository.findById(idEnfermeiro);
    }
    
    public List<Enfermeiro> findAll(){
        return enfermeiroRepository.findAll();
    }

    public void delete(Enfermeiro enfermeiro){
        enfermeiroRepository.delete(enfermeiro);
    }
}
