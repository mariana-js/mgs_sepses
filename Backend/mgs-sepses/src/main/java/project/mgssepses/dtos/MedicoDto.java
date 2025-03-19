package project.mgssepses.dtos;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;

public class MedicoDto {

    @JsonProperty("idprofissional")
    private UUID idprofissional;

	@NotBlank
	private String crm;

    public UUID getIdprofissional() {
        return idprofissional;
    }

    public void setIdprofissional(UUID idprofissional) {
        this.idprofissional = idprofissional;
    }

    public String getCrm() {
        return crm;
    }

    public void setCrm(String crm) {
        this.crm = crm;
    }


}
