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
@Table(name = "paciente")
public class Paciente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idPaciente;

    @Column(name = "nome", nullable = false)
    private String nome;
    @Column(name = "cpf", nullable = false)
    private String cpf;
    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;
    @Column(name = "sexo", nullable = false)
    private String sexo;
    @Column(name = "celular1", nullable = false)
    private String celular1;
    @Column(name = "celular2", nullable = false)
    private String celular2;
    @Column(name = "ativo", nullable = false)
    private Boolean ativo;
    @Column(name = "risco_sepse", nullable = false)
    private String riscoSepse;
    @Column(name = "data_alteracao", nullable = false)
    private LocalDateTime dataAlteracao;

    /**
     * @return UUID return the idPaciente
     */
    public UUID getIdPaciente() {
        return idPaciente;
    }

    /**
     * @param idPaciente the idPaciente to set
     */
    public void setIdPaciente(UUID idPaciente) {
        this.idPaciente = idPaciente;
    }

    /**
     * @return String return the nome
     */
    public String getNome() {
        return nome;
    }

    /**
     * @param nome the nome to set
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    /**
     * @return String return the cpf
     */
    public String getCpf() {
        return cpf;
    }

    /**
     * @param cpf the cpf to set
     */
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    /**
     * @return LocalDate return the dataNascimento
     */
    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    /**
     * @param dataNascimento the dataNascimento to set
     */
    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    /**
     * @return String return the sexo
     */
    public String getSexo() {
        return sexo;
    }

    /**
     * @param sexo the sexo to set
     */
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    /**
     * @return String return the celular1
     */
    public String getCelular1() {
        return celular1;
    }

    /**
     * @param celular1 the celular1 to set
     */
    public void setCelular1(String celular1) {
        this.celular1 = celular1;
    }

    /**
     * @return String return the celular2
     */
    public String getCelular2() {
        return celular2;
    }

    /**
     * @param celular2 the celular2 to set
     */
    public void setCelular2(String celular2) {
        this.celular2 = celular2;
    }

    /**
     * @return Boolean return the ativo
     */
    public Boolean isAtivo() {
        return ativo;
    }

    /**
     * @param ativo the ativo to set
     */
    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    /**
     * @return String return the riscoSepse
     */
    public String getRiscoSepse() {
        return riscoSepse;
    }

    /**
     * @param riscoSepse the riscoSepse to set
     */
    public void setRiscoSepse(String riscoSepse) {
        this.riscoSepse = riscoSepse;
    }

    /**
     * @return LocalDate return the dataAlteracao
     */
    public LocalDateTime getDataAlteracao() {
        return dataAlteracao;
    }

    /**
     * @param dataAlteracao the dataAlteracao to set
     */
    public void setDataAlteracao(LocalDateTime dataAlteracao) {
        this.dataAlteracao = dataAlteracao;
    }

}
