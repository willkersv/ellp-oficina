package com.ellp.certificado.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ellp.certificado.model.Aluno;
import com.ellp.certificado.repository.AlunoRepository;
import com.ellp.certificado.repository.CertificadoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private CertificadoRepository certificadoRepository;

    public List<Aluno> findAll() {
        return alunoRepository.findAll();
    }

    public ResponseEntity<?> getAlunoById(String idAluno) {
        Optional<Aluno> aluno = alunoRepository.findById(idAluno);
        if (aluno.isPresent()) {
            return ResponseEntity.ok(aluno.get());
        } else{
            return ResponseEntity.badRequest().body("Aluno não encontrado.");
        }
    }

    public ResponseEntity<?> getAlunoByNome(String nomeAluno) {
        Optional<Aluno> aluno = alunoRepository.findByNome(nomeAluno);
        if (aluno.isPresent()) {
            return ResponseEntity.ok(aluno.get());
        } else{
            return ResponseEntity.badRequest().body("Aluno não encontrado.");
        }
    }

    public ResponseEntity<?> createAluno(Aluno aluno) {
        if(aluno.getIdAluno() == null || aluno.getNome().isBlank() || aluno.getEmail().isBlank() || aluno.getCurso().isBlank()) {
            throw new IllegalArgumentException("Todos os campos devem ser preenchidos!!");
        }
        if(alunoRepository.existsById(aluno.getIdAluno()) || alunoRepository.existsByEmail(aluno.getEmail()) || alunoRepository.existsByNome(aluno.getNome())) {
            return ResponseEntity.badRequest().body("Aluno já cadastrado com este e-mail, nome ou ID!");
        }
        alunoRepository.save(aluno);
        return ResponseEntity.ok("Aluno adicionado com sucesso!");
    }

    public ResponseEntity<?> uptadeAluno(String idAluno, Aluno aluno) {
        if(!alunoRepository.existsById(idAluno)) {
            return ResponseEntity.badRequest().body("Aluno não encontrado.");
        }
        aluno.setIdAluno(idAluno);
        alunoRepository.save(aluno);
        return ResponseEntity.ok("Aluno atualizado com sucesso!");
    }

    public ResponseEntity<?> deleteAluno(String idAluno) {
        Optional<Aluno> alunoOptional = alunoRepository.findById(idAluno);
        if (alunoOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Aluno não encontrado.");
        }

        certificadoRepository.deleteByAlunoIdAluno(idAluno);
        
        alunoRepository.deleteById(idAluno);
        return ResponseEntity.ok("Aluno excluído com sucesso!");
    }
}
