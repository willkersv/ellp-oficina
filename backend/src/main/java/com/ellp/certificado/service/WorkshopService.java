package com.ellp.certificado.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ellp.certificado.model.Workshop;
import com.ellp.certificado.repository.WorkshopRepository;

import java.util.List;
import java.util.Optional;

@Service
public class WorkshopService {

    @Autowired
    private WorkshopRepository workshopRepository;

    public List<Workshop> getAllWorkshops() {
        return workshopRepository.findAll();
    }

    public Optional<Workshop> getWorkshopById(int id) {
        return workshopRepository.findById(id);
    }

    public Workshop createWorkshop(Workshop workshop) {
        return workshopRepository.save(workshop);
    }

    public Optional<Workshop> updateWorkshop(int id, Workshop workshopDetails) {
        return workshopRepository.findById(id).map(workshop -> {
            workshop.setNome(workshopDetails.getNome());
            workshop.setDuracao(workshopDetails.getDuracao());
            workshop.setData(workshopDetails.getData());
            workshop.setDescricao(workshopDetails.getDescricao());
            return workshopRepository.save(workshop);
        });
    }

    public boolean deleteWorkshop(int id) {
        return workshopRepository.findById(id).map(workshop -> {
            workshopRepository.delete(workshop);
            return true;
        }).orElse(false);
    }
}