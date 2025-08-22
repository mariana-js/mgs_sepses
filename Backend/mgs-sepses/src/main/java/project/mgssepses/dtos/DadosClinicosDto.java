package project.mgssepses.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;

public class DadosClinicosDto {

    @JsonProperty("id")
    private UUID id;

    @NotNull
    private UUID idPaciente;

    @NotNull
    private UUID idProfissional;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime data;
    
    private String relacaoP02Fi02;
    
    private String plaquetas;

    private String diurese;
    
    private String creatinina;
    
    private String glasgow;

    private String ep;

    private String norepinefrina;

    private String dobutamina;

    private String dopamina;

    private String pam;

    private String bilirrubina;


    

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



    
}
