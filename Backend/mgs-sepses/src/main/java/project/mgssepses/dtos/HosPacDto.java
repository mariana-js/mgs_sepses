package project.mgssepses.dtos;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;

public class HosPacDto {

    @JsonProperty("id")
    private UUID id;

    @NotNull
    private UUID idhospital;

    @NotNull
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
