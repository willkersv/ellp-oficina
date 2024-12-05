package com.ellp.certificado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ellp.certificado.model.Workshop;
import com.ellp.certificado.service.WorkshopService;

import java.util.List;


@RestController
@RequestMapping("/api/workshops")
public class WorkshopController {

    @Autowired
    private WorkshopService workshopService;

    @GetMapping
    public List<Workshop> getAllWorkshops() {
        return workshopService.getAllWorkshops();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getWorkshopById(@PathVariable int id) {
        return workshopService.getWorkshopById(id);
    }

    @GetMapping("/search/{nomeWorkshop}")
    public ResponseEntity<?> getWorkshopByNome(@PathVariable String nomeWorkshop) {
        return workshopService.getWorkshopByNome(nomeWorkshop);
    }

    @PostMapping
    public ResponseEntity<?> createWorkshop(@RequestBody Workshop workshop) {
        return workshopService.createWorkshop(workshop);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateWorkshop(@PathVariable int id, @RequestBody Workshop workshop) {
        try {
            return ResponseEntity.ok(workshopService.updateWorkshop(id, workshop));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkshop(@PathVariable int id) {
        return workshopService.deleteWorkshop(id);    
    }
}
