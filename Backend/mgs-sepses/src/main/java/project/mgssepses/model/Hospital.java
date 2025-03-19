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
@Table(name = "hospital")
public class Hospital implements Serializable{
    private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID idHospital;

	@Column(name = "razao_social", nullable = false)
	private String razaosocial;

	@Column(name = "nome_fantasia", nullable = false)
	private String nomefantasia;

	@Column(name = "cnpj", nullable = false)
	private String cnpj;

    @Column(name = "ativo", nullable = false)
	private Boolean ativo;

    public UUID getIdHospital() {
        return idHospital;
    }

    public void setIdHospital(UUID idHospital) {
        this.idHospital = idHospital;
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

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    
}
