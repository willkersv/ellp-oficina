package com.ellp.certificado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ellp.certificado.model.Workshop;
import com.ellp.certificado.service.WorkshopService;

import java.util.List;

@RestController
@RequestMapping("/workshops")
public class WorkshopController {

    @Autowired
    private WorkshopService workshopService;

    @GetMapping
    public List<Workshop> getAllWorkshops() {
        return workshopService.getAllWorkshops();
    }

    @PostMapping
    public Workshop createWorkshop(@RequestBody Workshop workshop) {
        return workshopService.createWorkshop(workshop);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workshop> getWorkshopById(@PathVariable int id) {
        return workshopService.getWorkshopById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workshop> updateWorkshop(@PathVariable int id, @RequestBody Workshop workshopDetails) {
        return workshopService.updateWorkshop(id, workshopDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkshop(@PathVariable int id) {
        if (workshopService.deleteWorkshop(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
