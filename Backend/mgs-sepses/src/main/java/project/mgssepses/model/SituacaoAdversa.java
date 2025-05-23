package project.mgssepses.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "situacao_adversa")
public class SituacaoAdversa implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "id_paciente", nullable = false)
    private UUID idpaciente;

    @Column(name = "idprofissional", nullable = false)
    private UUID idprofissional;

    @Column(name = "data", nullable = false)
    private LocalDate data;

    @Column(name = "situacao_adversa", nullable = false)
    private String descricaoSituacaoAdversa;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getIdpaciente() {
        return idpaciente;
    }

    public void setIdpaciente(UUID idpaciente) {
        this.idpaciente = idpaciente;
    }

    public UUID getIdprofissional() {
        return idprofissional;
    }

    public void setIdprofissional(UUID idprofissional) {
        this.idprofissional = idprofissional;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getDescricaoSituacaoAdversa() {
        return descricaoSituacaoAdversa;
    }

    public void setDescricaoSituacaoAdversa(String descricaoSituacaoAdversa) {
        this.descricaoSituacaoAdversa = descricaoSituacaoAdversa;
    }
    

    
    
}
