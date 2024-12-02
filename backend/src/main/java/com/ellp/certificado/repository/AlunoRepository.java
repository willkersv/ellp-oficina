package com.ellp.certificado.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ellp.certificado.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, String> {
}
