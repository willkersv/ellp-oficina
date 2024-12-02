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
    public ResponseEntity<?> cadastrarProfessor(@RequestBody Professor professor) {
        try {
            Professor novoProfessor = professorService.cadastrarProfessor(professor);
            return ResponseEntity.ok("Professor cadastrado com sucesso, ferinha\n" + novoProfessor.getNome());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> realizarLogin(@RequestParam String email, @RequestParam String senha) {
        try {
            professorService.realizarLogin(email, senha);
            return ResponseEntity.ok("Login realizado com sucesso ferinha :) ");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping()
    public List<Professor> getAll() {
        try {
            List<Professor> professores = professorService.getAll();
            return professores;
        } catch (RuntimeException e) {
            return null;
        }
    }
}
