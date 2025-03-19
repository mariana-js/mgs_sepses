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
@Table(name = "profissional")
public class Profissional implements Serializable  {

    private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idprofissional")
	private UUID idprofissional;

    @Column(name = "id_hospital", nullable = false) 
	private UUID idHospital;

	@Column(name = "nome", nullable = false)
	private String nome;

	@Column(name = "cpf", nullable = false)
	private String cpf;

	@Column(name = "email",nullable = false)
	private String email;

	@Column(name = "senha", nullable = false)
	private String senha;

	@Column(name = "estado",  nullable = false)
	private String estado;

	@Column(name = "status", nullable = false)
	private Boolean status;

	@Column(name = "admin", nullable = false)
	private Boolean admin;

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public UUID getIdProfissional() {
        return idprofissional;
    }

    public void setIdProfissional(UUID idprofissional) {
        this.idprofissional = idprofissional;
    }

    public UUID getIdHospital() {
        return idHospital;
    }

    public void setIdHospital(UUID idHospital) {
        this.idHospital = idHospital;
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
