package project.mgssepses.dtos;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;

public class EnfermeiroDto {

    @JsonProperty("idprofissional")
    private UUID idprofissional;

	@NotBlank
	private String coren;

    public UUID getIdprofissional() {
        return idprofissional;
    }

    public void setIdprofissional(UUID idprofissional) {
        this.idprofissional = idprofissional;
    }

    public String getCoren() {
        return coren;
    }

    public void setCoren(String coren) {
        this.coren = coren;
    }


    
}
