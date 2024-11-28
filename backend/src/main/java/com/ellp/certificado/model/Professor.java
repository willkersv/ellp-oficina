package com.ellp.certificado.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "professor")
public class Professor {

    @Id
    private String idProfessor;

    private String nome;
    private String email;
    private String senha;

    public String getIdProfessor() {
        return idProfessor;
    }

    public void setIdProfessor(String idProfessor) {
        this.idProfessor = idProfessor;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
