package com.ellp.certificado.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "workshop")
public class Workshop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idWorkshop;

    private String nome;
    private Integer duracao;
    private LocalDate data;
    private String descricao;

    public Workshop() {}

    public Workshop(String nome, Integer duracao, LocalDate data, String descricao) {
        this.nome = nome;
        this.duracao = duracao;
        this.data = data;
        this.descricao = descricao;
    }

    public int getIdWorkshop() {
        return idWorkshop;
    }

    public void setIdWorkshop(int idWorkshop) {
        this.idWorkshop = idWorkshop;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getDuracao() {
        return duracao;
    }

    public void setDuracao(Integer duracao) {
        this.duracao = duracao;
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
