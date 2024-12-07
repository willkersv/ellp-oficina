package com.ellp.certificado.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ellp.certificado.model.Certificado;
import com.ellp.certificado.model.Workshop;
import com.ellp.certificado.repository.CertificadoRepository;
import com.ellp.certificado.repository.WorkshopRepository;

import java.util.List;
import java.util.Optional;

@Service
public class WorkshopService {

    @Autowired
    private WorkshopRepository workshopRepository;

    @Autowired
    private CertificadoRepository certificadoRepository;

    public List<Workshop> getAllWorkshops() {
        return workshopRepository.findAll();
    }

    public ResponseEntity<?> getWorkshopById(int idWorkshop) {
        Optional<Workshop> workshop = workshopRepository.findById(idWorkshop);
        if (workshop.isPresent()) {
            return ResponseEntity.ok(workshop.get());
        } else{
            return ResponseEntity.badRequest().body("Workshop não encontrado.");
        }
    }

    public ResponseEntity<?> getWorkshopByNome(String nomeWorkshop) {
        List<Workshop> workshops = workshopRepository.findByNomeContainingIgnoreCase(nomeWorkshop);
        if (workshops.isEmpty()) {
            return ResponseEntity.badRequest().body("Nenhum workshop encontrado com o nome: " + nomeWorkshop);
        }
        return ResponseEntity.ok(workshops);
    }

    public ResponseEntity<?> createWorkshop(Workshop workshop) {
        if (workshopRepository.existsByNome(workshop.getNome())) {
            return ResponseEntity.badRequest().body("Workshop já cadastrado com este nome.");
        }
        if (workshop.getNome().isBlank() || workshop.getDescricao().isBlank() || workshop.getData() == null || workshop.getDuracao() <= 0) {
            return ResponseEntity.badRequest().body("Todos os campos do workshop devem ser preenchidos corretamente.");
        }
        workshopRepository.save(workshop);
        return ResponseEntity.ok("Workshop adicionado com sucesso!");
    }

    public ResponseEntity<?> updateWorkshop(Integer idWorkshop, Workshop workshopAtualizado) {
        Optional<Workshop> workshop = workshopRepository.findById(idWorkshop);

        if (workshop.isEmpty()) {
            return ResponseEntity.badRequest().body("Workshop com o ID especificado não foi encontrado.");
        }

        if (workshopAtualizado.getNome() == null || workshopAtualizado.getNome().isBlank()) {
            return ResponseEntity.badRequest().body("O nome do workshop não pode ser vazio.");
        }

        if (workshopAtualizado.getDuracao() == null || workshopAtualizado.getDuracao() <= 0) {
            return ResponseEntity.badRequest().body("A duração do workshop deve ser maior que zero.");
        }

        if (workshopAtualizado.getData() == null) {
            return ResponseEntity.badRequest().body("A data do workshop não pode ser nula.");
        }

        if (workshopAtualizado.getDescricao() == null || workshopAtualizado.getDescricao().isBlank()) {
            return ResponseEntity.badRequest().body("A descrição do workshop não pode ser vazia.");
        }

        Workshop newWorkshop = workshop.get();
        newWorkshop.setNome(workshopAtualizado.getNome());
        newWorkshop.setDuracao(workshopAtualizado.getDuracao());
        newWorkshop.setData(workshopAtualizado.getData());
        newWorkshop.setDescricao(workshopAtualizado.getDescricao());

        workshopRepository.save(newWorkshop);

        return ResponseEntity.ok("Workshop atualizado com sucesso!");
    }

    public ResponseEntity<?> deleteWorkshop(int id) {
        if (!workshopRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Workshop não encontrado.");
        }
        
        List<Certificado> certificados = certificadoRepository.findByWorkshopId(id);
        certificadoRepository.deleteAll(certificados);

        workshopRepository.deleteById(id);

        return ResponseEntity.ok("Workshop e certificados associados excluídos com sucesso!");
}
    
}