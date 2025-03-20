package project.mgssepses.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.mgssepses.model.SituacaoAdversa;

@Repository
public interface SituacaoAdversaRepository extends JpaRepository<SituacaoAdversa, UUID>{
    
}
