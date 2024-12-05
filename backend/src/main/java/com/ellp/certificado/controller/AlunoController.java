package com.ellp.certificado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ellp.certificado.model.Aluno;
import com.ellp.certificado.service.AlunoService;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public List<Aluno> getAll() {
        return alunoService.findAll();
    }

    @GetMapping("/{idAluno}")
    public ResponseEntity<?> getAlunoById(@PathVariable String idAluno) {
        return alunoService.getAlunoById(idAluno);
    }

    @GetMapping("/search/{nomeAluno}")
    public ResponseEntity<?> getAlunoByNome(@PathVariable String nomeAluno) {
        return alunoService.getAlunoByNome(nomeAluno);
    }

    @PostMapping
    public ResponseEntity<?> createAluno(@RequestBody Aluno aluno) {
        try {
            return ResponseEntity.ok(alunoService.createAluno(aluno));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable String id, @RequestBody Aluno aluno) {
        try {
            return ResponseEntity.ok(alunoService.uptadeAluno(id, aluno));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAluno(@PathVariable String id) {
        return alunoService.deleteAluno(id);
    }
}