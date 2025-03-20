package project.mgssepses.dtos;

import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SituacaoAdversaDto {
    @JsonProperty("id")
    private UUID id;

    @NotNull
    private UUID idpaciente;

    @NotNull
    private UUID idprofissional;

    @NotNull
    private LocalDate data;

    @NotBlank
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
