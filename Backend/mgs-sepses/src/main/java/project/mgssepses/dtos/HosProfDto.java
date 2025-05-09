package project.mgssepses.dtos;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;


public class HosProfDto {

    @JsonProperty("id")
    private UUID id;

    @NotNull
    private UUID idhospital;

    @NotNull
    private UUID idprofissional;

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

    public UUID getIdprofissional() {
        return idprofissional;
    }

    public void setIdprofissional(UUID idprofissional) {
        this.idprofissional = idprofissional;
    }


   
}
