package com.ellp.certificado;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.ellp.certificado.model.Professor;
import com.ellp.certificado.repository.ProfessorRepository;
import com.ellp.certificado.service.ProfessorService;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
class ProfessorServiceTest {

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @BeforeEach
    void setup() {
        professorRepository.deleteAll();
        Professor professor = new Professor("P001", "Carlos", "carlos@gmail.com", encoder.encode("senha123"));
        professorRepository.save(professor);
    }

    @SuppressWarnings("null")
    @Test
    void testLogin_Success() {
        ResponseEntity<Boolean> response = professorService.login("carlos@gmail.com", "senha123");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody());
    }

    @SuppressWarnings("null")
    @Test
    void testLogin_InvalidPassword() {
        ResponseEntity<Boolean> response = professorService.login("carlos@gmail.com", "senhaErrada");

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertFalse(response.getBody());
    }

    @Test
    void testLogin_InvalidEmail() {
        Exception exception = assertThrows(RuntimeException.class, () -> {
            professorService.login("inexistente@gmail.com", "senha123");
        });

        assertEquals("E-mail ou senha inválidos.", exception.getMessage());
    }

    @Test
    void testLogin_NullEmail() {
        Exception exception = assertThrows(RuntimeException.class, () -> {
            professorService.login(null, "senha123");
        });

        assertEquals("E-mail ou senha inválidos.", exception.getMessage());
    }

    @Test
    void testCreateProfessor_Success() {
       
        Professor professor = new Professor("P002", "Ana Lima", "ana@gmail.com", "senha123");
        ResponseEntity<?> response = professorService.createProfessor(professor);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals("Professor adicionado com sucesso!", response.getBody());

        Optional<Professor> professorSalvo = professorRepository.findById("P002");
        Assertions.assertTrue(professorSalvo.isPresent());
        Assertions.assertEquals("Ana Lima", professorSalvo.get().getNome());
    }

    @Test
    void testCreateProfessor_AleradyRegistered() {
        professorRepository.save(new Professor("P001", "Ana Lima", "ana@gmail.com", "senha123"));
        Professor professorDuplicado = new Professor("P001", "Ana Lima", "ana@gmail.com", "senha123");
        ResponseEntity<?> response = professorService.createProfessor(professorDuplicado);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals("Professor já cadastrado com este e-mail ou ID", response.getBody());
    }

    @Test
    void testCreateProfessor_DuplicatedEmail() {
        Professor professor1 = new Professor("P001", "Carlos", "carlos@gmail.com", "1234");
        Professor professor2 = new Professor("P002", "João", "carlos@gmail.com", "abcd");

        professorService.createProfessor(professor1);
        ResponseEntity<?> response = professorService.createProfessor(professor2);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void testGetbyEmail_Success() {
        Professor professor = new Professor("P001", "Carlos", "carlos@gmail.com", "1234");
        professorRepository.save(professor);

        boolean exists = professorRepository.existsByEmail("carlos@gmail.com");
        assertTrue(exists);
    }

    @Test
    void testGetByEmail_EmailNotFound() {
        boolean exists = professorRepository.existsByEmail("inexistente@gmail.com");
        assertFalse(exists);
    }

    @Test
    void testUpdateProfessor_Success() {
        professorRepository.save(new Professor("P001", "Ana Lima", "ana@gmail.com", "senha123"));
        Professor professorAtualizado = new Professor("P001", "Ana Maria Lima", "ana@gmail.com", "novaSenha123");
        ResponseEntity<?> response = professorService.updateProfessor("P001", professorAtualizado);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals("Professor atualizado com sucesso!", response.getBody());

        Optional<Professor> professorSalvo = professorRepository.findById("P001");
        Assertions.assertTrue(professorSalvo.isPresent());
        Assertions.assertEquals("Ana Maria Lima", professorSalvo.get().getNome());
        Assertions.assertEquals("novaSenha123", professorSalvo.get().getSenha());
    }

    @Test
    void testUpdateProfessor_IdNotFound() {
        Professor professorAtualizado = new Professor("P999", "Carlos Atualizado", "inexistente@gmail.com", "nova_senha");
        ResponseEntity<?> response = professorService.updateProfessor("P999", professorAtualizado);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Professor não encontrado.", response.getBody());
    }

    @Test
    void testDeleteProfessor_Success() {
        professorRepository.save(new Professor("P001", "Ana Lima", "ana@gmail.com", "senha123"));
        ResponseEntity<?> response = professorService.deleteProfessor("P001");
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals("Professor deletado com sucesso!", response.getBody());
        Optional<Professor> professorDeletado = professorRepository.findById("P001");
        Assertions.assertFalse(professorDeletado.isPresent());
    }

    @Test
    void testDeleteProfessor_IdNotFound() {
        ResponseEntity<?> response = professorService.deleteProfessor("P999");

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Professor não encontrado.", response.getBody());
    }
}
