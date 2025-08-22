package project.mgssepses.dtos;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProfissionalDto {

    @JsonProperty("idprofissional")
    private UUID idprofissional;

    @NotBlank
    private String nome;

    @NotBlank
    @Size(max = 11)
	private String cpf;

    @NotBlank
	private String email;

    @NotBlank
	private String senha;

    @Size(max = 2)
	private String estado;

	private Boolean status;

	private Boolean admin;

    public UUID getIdProfissional() {
        return idprofissional;
    }

    public void setIdProfissional(UUID idprofissional) {
        this.idprofissional = idprofissional;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }



}
