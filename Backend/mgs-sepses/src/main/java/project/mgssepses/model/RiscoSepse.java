package project.mgssepses.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "risco_sepse")
public class RiscoSepse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "id_paciente", nullable = false)
    private UUID idpaciente;

    @Column(name = "data", insertable = false, updatable = false,
            columnDefinition = "DATE DEFAULT CURRENT_DATE")
    private LocalDateTime data;

    @Column(name = "risco", nullable = false)
    private String risco;

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

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public String getRisco() {
        return risco;
    }

    public void setRisco(String risco) {
        this.risco = risco;
    }

}
