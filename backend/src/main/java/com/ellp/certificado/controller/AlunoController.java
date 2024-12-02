package com.ellp.certificado.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Aluno> getAllAlunos() {
        return alunoService.findAllAlunos();
    }

    @GetMapping("/{idAluno}")
    public Aluno getAlunoById(@PathVariable String idAluno) {
        return alunoService.findAlunoById(idAluno);
    }

    @PostMapping
    public Aluno createAluno(@RequestBody Aluno aluno) {
        return alunoService.saveAluno(aluno);
    }

    @DeleteMapping("/{idAluno}")
    public void deleteAluno(@PathVariable String idAluno) {
        alunoService.deleteAluno(idAluno);
    }
}