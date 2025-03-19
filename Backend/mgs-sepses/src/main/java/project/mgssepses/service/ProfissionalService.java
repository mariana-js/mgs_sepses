package project.mgssepses.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.mgssepses.model.Profissional;
import project.mgssepses.repository.ProfissionalRepository;

@Service
public class ProfissionalService {

    final ProfissionalRepository profissionalRepository;

    public ProfissionalService(ProfissionalRepository profissionalRepository) {
        this.profissionalRepository = profissionalRepository;
    }

    @Transactional
    public Profissional save(Profissional profissional) {
        return profissionalRepository.save(profissional);
    }

    public Optional<Profissional> findById(UUID idprofissional) {
        return profissionalRepository.findById(idprofissional);
    }

    public List<Profissional> findAll() {
        return profissionalRepository.findAll();

    }

    public void delete(Profissional profissional) {
        profissionalRepository.delete(profissional);
    }
}
