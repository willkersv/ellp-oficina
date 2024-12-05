package com.ellp.certificado.model;

import java.io.Serializable;
import java.util.Objects;

public class CertificadoId implements Serializable {

    private Integer workshop;
    private String aluno;


    public CertificadoId(String aluno, Integer workshop) {
        this.workshop = workshop;
        this.aluno = aluno;
    }

    public CertificadoId() {
    }

    public Integer getWorkshop() {
        return workshop;
    }

    public void setWorkshop(Integer workshop) {
        this.workshop = workshop;
    }

    public String getAluno() {
        return aluno;
    }

    public void setAluno(String aluno) {
        this.aluno = aluno;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CertificadoId that = (CertificadoId) o;
        return Objects.equals(workshop, that.workshop) && Objects.equals(aluno, that.aluno);
    }

    @Override
    public int hashCode() {
        return Objects.hash(workshop, aluno);
    }
}