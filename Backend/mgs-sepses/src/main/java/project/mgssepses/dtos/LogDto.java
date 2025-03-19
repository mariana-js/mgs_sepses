package project.mgssepses.dtos;

import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class LogDto {

    @JsonProperty("id_log")
    private UUID idLog;

    @NotNull
    @JsonProperty("idProfissional")
	private UUID idProfissional;

    @NotNull
	private LocalDate data;

    @NotBlank
	private String descricao;

    public UUID getIdLog() {
        return idLog;
    }

    public void setIdLog(UUID idLog) {
        this.idLog = idLog;
    }

    public UUID getIdProfissional() {
        return idProfissional;
    }

    public void setIdProfissional(UUID idProfissional) {
        this.idProfissional = idProfissional;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    
}
