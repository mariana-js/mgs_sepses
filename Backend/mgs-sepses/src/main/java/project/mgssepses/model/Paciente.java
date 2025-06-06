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
@Table(name = "paciente")
public class Paciente  implements Serializable{
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
	private LocalDate dataAlteracao;
    
    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
    public LocalDate getDataAlteracao() {
        return dataAlteracao;
    }
    public void setDataAlteracao(LocalDate dataAlteracao) {
        this.dataAlteracao = dataAlteracao;
    }
    public UUID getIdPaciente() {
        return idPaciente;
    }
    public void setIdPaciente(UUID idPaciente) {
        this.idPaciente = idPaciente;
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
    public LocalDate getDataNascimento() {
        return dataNascimento;
    }
    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
    public String getSexo() {
        return sexo;
    }
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
    public String getCelular1() {
        return celular1;
    }
    public void setCelular1(String celular1) {
        this.celular1 = celular1;
    }
    public String getCelular2() {
        return celular2;
    }
    public void setCelular2(String celular2) {
        this.celular2 = celular2;
    }
    public String getRiscoSepse() {
        return riscoSepse;
    }
    public void setRiscoSepse(String riscoSepse) {
        this.riscoSepse = riscoSepse;
    }


    
}
