package com.ellp.certificado.model;


import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "certificado")
@IdClass(CertificadoId.class)
public class Certificado {

    @Id
    @ManyToOne
    @JoinColumn(name = "idWorkshop", nullable = false)
    private Workshop workshop;

    @Id
    @ManyToOne
    @JoinColumn(name = "idAluno", nullable = false)
    private Aluno aluno;

    public Workshop getWorkshop() {
        return workshop;
    }

    public void setWorkshop(Workshop workshop) {
        this.workshop = workshop;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

}

