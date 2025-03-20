package project.mgssepses.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.mgssepses.model.Paciente;
import project.mgssepses.repository.PacienteRepository;

@Service
public class PacienteService {
    final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Transactional
    public Paciente save(Paciente paciente){
        return pacienteRepository.save(paciente);
    }

    public Optional<Paciente> findById(UUID idPaciente){
        return pacienteRepository.findById(idPaciente);
    }

    public List<Paciente> findAll(){
        return pacienteRepository.findAll();
    }

    public void delete(Paciente paciente){
        pacienteRepository.delete(paciente);
    }
}
