package project.mgssepses.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.mgssepses.model.DadosClinicos;

@Repository
public interface DadosClinicosRepository extends JpaRepository<DadosClinicos, UUID>{
    
}
