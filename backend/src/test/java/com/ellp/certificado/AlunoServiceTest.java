package com.ellp.certificado;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ellp.certificado.model.Aluno;
import com.ellp.certificado.model.Certificado;
import com.ellp.certificado.model.Workshop;
import com.ellp.certificado.repository.AlunoRepository;
import com.ellp.certificado.repository.CertificadoRepository;
import com.ellp.certificado.repository.WorkshopRepository;
import com.ellp.certificado.service.AlunoService;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
public class AlunoServiceTest {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private CertificadoRepository certificadoRepository;

    @Autowired
    private WorkshopRepository workshopRepository;

 @BeforeEach
    void setup() {
        alunoRepository.deleteAll();
        certificadoRepository.deleteAll();
        workshopRepository.deleteAll();

        Aluno aluno = new Aluno("A001", "João", "joao@gmail.com", "eng");
        alunoRepository.save(aluno);

        Workshop workshop = new Workshop("Workshop Teste", 2, LocalDate.now(), "Descrição");
        workshopRepository.save(workshop);

        Certificado certificado = new Certificado();
        certificado.setAluno(aluno);
        certificado.setWorkshop(workshop);
        certificadoRepository.save(certificado);
    }

    @Test
    void testDeleteAluno_WithCertificado() {
        ResponseEntity<?> response = alunoService.deleteAluno("A001");

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals("Aluno excluído com sucesso!", response.getBody());

        Assertions.assertFalse(alunoRepository.existsById("A001"));

        Assertions.assertTrue(certificadoRepository.findAll().isEmpty());
    }

    @Test
    void testDeleteAluno_WithoutCertificado() {
        certificadoRepository.deleteAll();

        ResponseEntity<?> response = alunoService.deleteAluno("A001");

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals("Aluno excluído com sucesso!", response.getBody());

        Assertions.assertFalse(alunoRepository.existsById("A001"));
    }

    @Test
    void testFindAll() {
        Assertions.assertFalse(alunoService.findAll().isEmpty());
    }

    @Test
    void testGetAlunoById_Success() {
        ResponseEntity<?> response = alunoService.getAlunoById("A001");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Aluno aluno = (Aluno) response.getBody();
        assertEquals("João", aluno.getNome());
    }

    @Test
    void testGetAlunoById_NotFound() {
        ResponseEntity<?> response = alunoService.getAlunoById("A999");
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Aluno não encontrado.", response.getBody());
    }

    @Test
    void testGetAlunoByNome_Success() {
        ResponseEntity<?> response = alunoService.getAlunoByNome("João");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Aluno aluno = (Aluno) response.getBody();
        assertEquals("joao@gmail.com", aluno.getEmail());
    }

    @Test
    void testGetAlunoByNome_NotFound() {
        ResponseEntity<?> response = alunoService.getAlunoByNome("Inexistente");
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Aluno não encontrado.", response.getBody());
    }

    @Test
    void testCreateAluno_Success() {
        Aluno novoAluno = new Aluno("A002", "Ana Paula", "ana@gmail.com", "Engenharia de Software");
        ResponseEntity<?> response = alunoService.createAluno(novoAluno);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Aluno adicionado com sucesso!", response.getBody());

        Optional<Aluno> alunoSalvo = alunoRepository.findById("A002");
        assertTrue(alunoSalvo.isPresent());
        assertEquals("Ana Paula", alunoSalvo.get().getNome());
    }

    @Test
    void testCreateAluno_Duplicated() {
        Aluno alunoDuplicado = new Aluno("A001", "Carlos Silva", "carlos@gmail.com", "Ciência da Computação");
        ResponseEntity<?> response = alunoService.createAluno(alunoDuplicado);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Aluno já cadastrado com este e-mail, nome ou ID!", response.getBody());
    }

    @Test
    void testUpdateAluno_Success() {
        Aluno alunoAtualizado = new Aluno("A001", "Carlos Eduardo Silva", "carlos@gmail.com", "Análise de Sistemas");
        ResponseEntity<?> response = alunoService.uptadeAluno("A001", alunoAtualizado);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Aluno atualizado com sucesso!", response.getBody());

        Optional<Aluno> alunoSalvo = alunoRepository.findById("A001");
        assertTrue(alunoSalvo.isPresent());
        assertEquals("Carlos Eduardo Silva", alunoSalvo.get().getNome());
        assertEquals("Análise de Sistemas", alunoSalvo.get().getCurso());
    }

    @Test
    void testUpdateAluno_NotFound() {
        Aluno alunoAtualizado = new Aluno("A999", "João Silva", "joao@gmail.com", "Matemática");
        ResponseEntity<?> response = alunoService.uptadeAluno("A999", alunoAtualizado);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Aluno não encontrado.", response.getBody());
    }

    @Test
    void testDeleteAluno_Success() {
        ResponseEntity<?> response = alunoService.deleteAluno("A001");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Aluno excluído com sucesso!", response.getBody());
        assertFalse(alunoRepository.existsById("A001"));
    }

    @Test
    void testDeleteAluno_NotFound() {
        ResponseEntity<?> response = alunoService.deleteAluno("A999");

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Aluno não encontrado.", response.getBody());
    }
}