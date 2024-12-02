package com.ellp.certificado.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ellp.certificado.model.Aluno;
import com.ellp.certificado.repository.AlunoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public List<Aluno> findAllAlunos() {
        return alunoRepository.findAll();
    }

    public Aluno findAlunoById(String idAluno) {
        Optional<Aluno> aluno = alunoRepository.findById(idAluno);
        return aluno.orElse(null);
    }

    public Aluno saveAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public void deleteAluno(String idAluno) {
        alunoRepository.deleteById(idAluno);
    }
}