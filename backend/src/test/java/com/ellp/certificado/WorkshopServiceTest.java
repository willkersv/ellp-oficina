package com.ellp.certificado;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ellp.certificado.model.Workshop;
import com.ellp.certificado.repository.WorkshopRepository;
import com.ellp.certificado.service.WorkshopService;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
class WorkshopServiceTest {

    @Autowired
    private WorkshopService workshopService;

    @Autowired
    private WorkshopRepository workshopRepository;

    private Workshop workshop;

    @BeforeEach
    void setup() {
        workshopRepository.deleteAll();
        workshop = new Workshop("Workshop 1", 2, LocalDate.of(2024, 12, 15), "Descrição do workshop");
        workshopRepository.save(workshop);
    }

    @Test
    void testCreateWorkshop_Success() {
        Workshop newWorkshop = new Workshop("Workshop 2", 3, LocalDate.of(2024, 12, 20), "Nova descrição");
        ResponseEntity<?> response = workshopService.createWorkshop(newWorkshop);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Workshop adicionado com sucesso!", response.getBody());

        Optional<Workshop> savedWorkshop = workshopRepository.findById(newWorkshop.getIdWorkshop());
        assertTrue(savedWorkshop.isPresent());
        assertEquals("Workshop 2", savedWorkshop.get().getNome());
    }

    @Test
    void testCreateWorkshop_WorkshopExists() {
        ResponseEntity<?> response = workshopService.createWorkshop(workshop);
        
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Workshop já cadastrado com este nome.", response.getBody());
    }

    @Test
    void testCreateWorkshop_InvalidFields() {
        Workshop invalidWorkshop = new Workshop("", 0, null, "");

        ResponseEntity<?> response = workshopService.createWorkshop(invalidWorkshop);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Todos os campos do workshop devem ser preenchidos corretamente.", response.getBody());
    }

    @Test
    void testUpdateWorkshop_Success() {
        Workshop updatedWorkshop = new Workshop("Workshop Atualizado", 4, LocalDate.of(2024, 12, 25), "Descrição atualizada");
        ResponseEntity<?> response = workshopService.updateWorkshop(workshop.getIdWorkshop(), updatedWorkshop);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Workshop atualizado com sucesso!", response.getBody());

        Optional<Workshop> savedWorkshop = workshopRepository.findById(workshop.getIdWorkshop());
        assertTrue(savedWorkshop.isPresent());
        assertEquals("Workshop Atualizado", savedWorkshop.get().getNome());
        assertEquals("Descrição atualizada", savedWorkshop.get().getDescricao());
    }

    @Test
    void testUpdateWorkshop_NotFound() {
        Workshop updatedWorkshop = new Workshop("Workshop Inexistente", 3, LocalDate.of(2024, 12, 25), "Descrição");
        ResponseEntity<?> response = workshopService.updateWorkshop(999, updatedWorkshop);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Workshop com o ID especificado não foi encontrado.", response.getBody());
    }

    @Test
    void testDeleteWorkshop_Success() {
        ResponseEntity<?> response = workshopService.deleteWorkshop(workshop.getIdWorkshop());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Workshop excluído com sucesso!", response.getBody());

        Optional<Workshop> deletedWorkshop = workshopRepository.findById(workshop.getIdWorkshop());
        assertFalse(deletedWorkshop.isPresent());
    }

    @Test
    void testDeleteWorkshop_NotFound() {
        ResponseEntity<?> response = workshopService.deleteWorkshop(999);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Workshop não encontrado.", response.getBody());
    }

    @Test
    void testGetWorkshopById_Success() {
        ResponseEntity<?> response = workshopService.getWorkshopById(workshop.getIdWorkshop());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(workshop, response.getBody());
    }

    @Test
    void testGetWorkshopById_NotFound() {
        ResponseEntity<?> response = workshopService.getWorkshopById(999);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Workshop não encontrado.", response.getBody());
    }

    @Test
    void testGetWorkshopByNome_Success() {
        ResponseEntity<?> response = workshopService.getWorkshopByNome("Workshop 1");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((java.util.List<?>) response.getBody()).size() > 0);
    }

    @Test
    void testGetWorkshopByNome_NotFound() {
        ResponseEntity<?> response = workshopService.getWorkshopByNome("Inexistente");

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Nenhum workshop encontrado com o nome: Inexistente", response.getBody());
    }
}
