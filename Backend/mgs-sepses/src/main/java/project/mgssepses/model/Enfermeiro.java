package project.mgssepses.model;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "enfermeiro")
public class Enfermeiro implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "idProfissional", nullable = false)
    private UUID idprofissional;

	@Column(name = "coren", nullable = false)
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
