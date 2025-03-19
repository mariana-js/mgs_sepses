package project.mgssepses.dtos;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class HospitalDto {

    @JsonProperty("id_hospital")
    private UUID idHospital;

    @NotBlank(message = "CNPJ não pode estar em branco")
    @Pattern(regexp = "\\d{14}", message = "CNPJ deve conter exatamente 14 dígitos numéricos")
    private String cnpj;

    @NotBlank(message = "Razão social não deve estar em branco")
    private String razaosocial;

    @NotBlank(message = "Nome fantasia não deve estar em branco")
    private String nomefantasia;
    
    private boolean ativo;

    public UUID getIdHospital() {
        return idHospital;
    }

    public void setIdHospital(UUID idHospital) {
        this.idHospital = idHospital;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getRazaosocial() {
        return razaosocial;
    }

    public void setRazaosocial(String razaosocial) {
        this.razaosocial = razaosocial;
    }

    public String getNomefantasia() {
        return nomefantasia;
    }

    public void setNomefantasia(String nomefantasia) {
        this.nomefantasia = nomefantasia;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    

    
}
