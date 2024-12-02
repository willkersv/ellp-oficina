package com.ellp.certificado.model;

import java.io.Serializable;
import java.util.Objects;

public class CertificadoId implements Serializable {

    private Integer workshop;
    private String aluno;

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