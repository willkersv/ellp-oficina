package com.ellp.certificado;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ellp.certificado.model.Workshop;
import com.ellp.certificado.repository.WorkshopRepository;
import com.ellp.certificado.service.WorkshopService;

@ExtendWith(MockitoExtension.class)
class WorkshopServiceTest {

    @Mock
    private WorkshopRepository workshopRepository;

    @InjectMocks
    private WorkshopService workshopService;

    @Test
    void testCreateWorkshop_Success() {
        Workshop workshop = new Workshop("Workshop de Spring Boot", 4, LocalDate.now(), "Descrição");
        when(workshopRepository.save(workshop)).thenReturn(new Workshop(1, "Workshop de Spring Boot", 4, LocalDate.now(), "Descrição"));

        ResponseEntity<?> response = workshopService.createWorkshop(workshop);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals("Workshop adicionado com sucesso!", response.getBody());
        verify(workshopRepository, times(1)).save(workshop);
    }

    @Test
    void testUpdateWorkshop_Success() {
        Workshop workshopExistente = new Workshop( "Workshop de Java", 4, LocalDate.now(), "Descrição");
        Workshop workshopAtualizado = new Workshop("Workshop Avançado", 6, LocalDate.now(), "Descrição Atualizada");

        Mockito.when(workshopRepository.findById(1)).thenReturn(Optional.of(workshopExistente));

        ResponseEntity<?> response = workshopService.updateWorkshop(1, workshopAtualizado);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals("Workshop atualizado com sucesso!", response.getBody());
    }

    @Test
    void testUpdateWorkshop_NotFound() {
        Mockito.when(workshopRepository.findById(1)).thenReturn(Optional.empty());

        Workshop workshopAtualizado = new Workshop("Workshop Avançado", 6, LocalDate.now(), "Descrição Atualizada");

        ResponseEntity<?> response = workshopService.updateWorkshop(1, workshopAtualizado);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals("Workshop com o ID especificado não foi encontrado.", response.getBody());
    }

    @Test
    void testUpdateWorkshop_InvalidData() {
        Workshop workshopExistente = new Workshop("Workshop de Java", 4, LocalDate.now(), "Descrição");

        Workshop workshopAtualizado = new Workshop("", 0, null, "");

        Mockito.when(workshopRepository.findById(1)).thenReturn(Optional.of(workshopExistente));

        ResponseEntity<?> response = workshopService.updateWorkshop(1, workshopAtualizado);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertTrue(response.getBody().toString().contains("não pode ser vazio"));
    }
    
    @Test
    void testDeletarWorkshop_NaoEncontrado() {
        ResponseEntity<?> response = workshopService.deleteWorkshop(10);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals("Workshop não encontrado.", response.getBody());
        verify(workshopRepository, never()).delete(any());
    }
    
}
