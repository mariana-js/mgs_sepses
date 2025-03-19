package project.mgssepses.model;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "medico")
public class Medico implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "idprofissional", nullable = false)
    private UUID idprofissional;

	@Column(name = "crm", nullable = false)
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
