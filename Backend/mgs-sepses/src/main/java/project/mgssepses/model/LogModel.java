package project.mgssepses.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "log")
public class LogModel implements Serializable{
    private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID idLog;

	@Column(name = "idprofissional", nullable = false)
	private UUID idProfissional;

	@Column(name = "data", nullable = false)
	private LocalDate data;

	@Column(name = "descricao", nullable = false)
	private String descricao;

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

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
