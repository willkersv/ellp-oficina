package com.ellp.certificado.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ellp.certificado.model.Professor;
import com.ellp.certificado.repository.ProfessorRepository;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public Professor cadastrarProfessor(Professor professor) {
        if (professorRepository.findByEmail(professor.getEmail()) != null) {
            throw new RuntimeException("E-mail já cadastrado.");
        }
        return professorRepository.save(professor);
    }

    public Professor realizarLogin(String email, String senha) {
        Professor professor = professorRepository.findByEmail(email);
        if (professor == null || !professor.getSenha().equals(senha)) {
            throw new RuntimeException("E-mail ou senha inválidos.");
        }
        return professor;
    }

    public List<Professor> getAll() {
        return professorRepository.findAll();
    }
}