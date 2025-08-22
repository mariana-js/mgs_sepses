package project.mgssepses.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "dados_clinicos")
public class DadosClinicos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "id_paciente", nullable = false)
    private UUID idPaciente;

    @Column(name = "idprofissional", nullable = false)
    private UUID idProfissional;

    @Column(name = "data", insertable = false, updatable = false,
            columnDefinition = "DATE DEFAULT CURRENT_DATE")
    private LocalDateTime data;

    @Column(name = "RELACAOP02FI02", nullable = true)
    private String relacaoP02Fi02;

    @Column(name = "plaquetas", nullable = true)
    private String plaquetas;

    @Column(name = "diurese", nullable = true)
    private String diurese;

    @Column(name = "creatinina", nullable = true)
    private String creatinina;

    @Column(name = "glasgow", nullable = true)
    private String glasgow;

    @Column(name = "ep", nullable = true)
    private String ep;

    @Column(name = "norepinefrina", nullable = true)
    private String norepinefrina;

    @Column(name = "dobutamina", nullable = true)
    private String dobutamina;

    @Column(name = "dopamina", nullable = true)
    private String dopamina;

    @Column(name = "pam", nullable = true)
    private String pam;

    @Column(name = "bilirrubina", nullable = true)
    private String bilirrubina;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(UUID idPaciente) {
        this.idPaciente = idPaciente;
    }

    public UUID getIdProfissional() {
        return idProfissional;
    }

    public void setIdProfissional(UUID idProfissional) {
        this.idProfissional = idProfissional;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public String getRelacaoP02Fi02() {
        return relacaoP02Fi02;
    }

    public void setRelacaoP02Fi02(String relacaoP02Fi02) {
        this.relacaoP02Fi02 = relacaoP02Fi02;
    }

    public String getPlaquetas() {
        return plaquetas;
    }

    public void setPlaquetas(String plaquetas) {
        this.plaquetas = plaquetas;
    }

    public String getDiurese() {
        return diurese;
    }

    public void setDiurese(String diurese) {
        this.diurese = diurese;
    }

    public String getCreatinina() {
        return creatinina;
    }

    public void setCreatinina(String creatinina) {
        this.creatinina = creatinina;
    }

    public String getGlasgow() {
        return glasgow;
    }

    public void setGlasgow(String glasgow) {
        this.glasgow = glasgow;
    }

    public String getEp() {
        return ep;
    }

    public void setEp(String ep) {
        this.ep = ep;
    }

    public String getNorepinefrina() {
        return norepinefrina;
    }

    public void setNorepinefrina(String norepinefrina) {
        this.norepinefrina = norepinefrina;
    }

    public String getDobutamina() {
        return dobutamina;
    }

    public void setDobutamina(String dobutamina) {
        this.dobutamina = dobutamina;
    }

    public String getDopamina() {
        return dopamina;
    }

    public void setDopamina(String dopamina) {
        this.dopamina = dopamina;
    }

    public String getPam() {
        return pam;
    }

    public void setPam(String pam) {
        this.pam = pam;
    }

    public String getBilirrubina() {
        return bilirrubina;
    }

    public void setBilirrubina(String bilirrubina) {
        this.bilirrubina = bilirrubina;
    }

}
