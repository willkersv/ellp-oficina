package com.ellp.certificado.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ellp.certificado.model.Professor;
import com.ellp.certificado.service.ProfessorService;

@RestController
@RequestMapping("/api/professores")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @PostMapping("/cadastro")
    public ResponseEntity<?> createProfessor(@RequestBody Professor professor) {
        try {
            return professorService.createProfessor(professor);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfessor(@PathVariable String id, @RequestBody Professor professor) {
        try {
            return ResponseEntity.ok(professorService.updateProfessor(id, professor));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String senha) {
        try {
            return professorService.login(email, senha);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public List<Professor> getAllAlunos() {
        return professorService.getAll();
    }
}
