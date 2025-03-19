package project.mgssepses.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import project.mgssepses.model.Enfermeiro;

public interface EnfermeiroRepository  extends JpaRepository<Enfermeiro, UUID>{
    
}
