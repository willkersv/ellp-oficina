package com.ellp.certificado.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ellp.certificado.model.Professor;
import com.ellp.certificado.repository.ProfessorRepository;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    private final PasswordEncoder encoder;

    ProfessorService(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    public List<Professor> getAll() {
        return professorRepository.findAll();
    }

    public ResponseEntity<?> createProfessor(Professor professor) {
        if (professorRepository.existsByEmail(professor.getEmail()) || professorRepository.existsById(professor.getIdProfessor())) {
            return ResponseEntity.badRequest().body("Professor já cadastrado com este e-mail ou ID");
        }
        professor.setSenha(encoder.encode(professor.getSenha()));
        professorRepository.save(professor);
        return ResponseEntity.ok("Professor adicionado com sucesso!");
    }

    public ResponseEntity<?> updateProfessor(String id, Professor professor) {
        if (!professorRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Professor não encontrado.");
        }
        professor.setIdProfessor(id);
        professorRepository.save(professor);
        return ResponseEntity.ok("Professor atualizado com sucesso!");
    }

    public ResponseEntity<?> deleteProfessor(String id) {
        if (!professorRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Professor não encontrado.");
        }
        professorRepository.deleteById(id);
        return ResponseEntity.ok("Professor excluído com sucesso!");
    }

    public ResponseEntity<Boolean> login(String email, String senha) {
        Professor professor = professorRepository.findByEmail(email);
        if (professor == null) {
            throw new RuntimeException("E-mail ou senha inválidos.");
        }
        
        boolean valid = encoder.matches(senha, professor.getSenha());
        HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(valid);
    }
}