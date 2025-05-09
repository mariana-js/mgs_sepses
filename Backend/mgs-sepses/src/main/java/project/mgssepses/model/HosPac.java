package project.mgssepses.model;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "hos_pac")
public class HosPac implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "idhospital", nullable = false)
    private UUID idhospital;

    @Column(name = "idpaciente", nullable = false)
    private UUID idpaciente;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getIdhospital() {
        return idhospital;
    }

    public void setIdhospital(UUID idhospital) {
        this.idhospital = idhospital;
    }

    public UUID getIdpaciente() {
        return idpaciente;
    }

    public void setIdpaciente(UUID idpaciente) {
        this.idpaciente = idpaciente;
    }



}
