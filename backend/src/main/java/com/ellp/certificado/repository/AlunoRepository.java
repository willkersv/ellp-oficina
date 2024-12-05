package com.ellp.certificado.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ellp.certificado.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, String> {
    boolean existsByEmail(String email);
    boolean existsByNome(String nome);
    Optional<Aluno> findByNome(String nome);
}
