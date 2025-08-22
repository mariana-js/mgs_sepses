package project.mgssepses.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.mgssepses.model.RiscoSepse;
import project.mgssepses.repository.RiscoSepseRepository;

@Service
public class RiscoSepseService {
    final RiscoSepseRepository riscoSepseRepository;

    public RiscoSepseService(RiscoSepseRepository riscoSepseRepository) {
        this.riscoSepseRepository = riscoSepseRepository;
    }

    @Transactional
    public RiscoSepse save(RiscoSepse risco){
        return riscoSepseRepository.save(risco);
    }

    public Optional<RiscoSepse> findById(UUID id){
        return riscoSepseRepository.findById(id);
    }

    public List<RiscoSepse> findAll(){
        return riscoSepseRepository.findAll();
    }

    public void delete(RiscoSepse risco){
        riscoSepseRepository.delete(risco);
    }

}
