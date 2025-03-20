package project.mgssepses.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.mgssepses.model.Paciente;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, UUID>{
    
}
