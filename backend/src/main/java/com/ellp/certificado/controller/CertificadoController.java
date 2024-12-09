package com.ellp.certificado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.ellp.certificado.model.Certificado;
import com.ellp.certificado.service.CertificadoService;

@RestController
@RequestMapping("/api/certificados")
public class CertificadoController {

    @Autowired
    private CertificadoService certificadoService;

    @PostMapping
    public ResponseEntity<?> createCertificado(@RequestBody Certificado certificado) {
        return certificadoService.createCertificado(certificado);
    }

    @GetMapping
    public ResponseEntity<?> getAllCertificado() {
        return certificadoService.getAllCertificado();
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<?> getByAluno(@PathVariable String idAluno) {
        return certificadoService.getByAluno(idAluno);
    }

    @GetMapping("/workshop/{idWorkshop}")
    public ResponseEntity<?> getByWorkshop(@PathVariable Integer idWorkshop) {
        return certificadoService.getByWorkshop(idWorkshop);
    }

    @DeleteMapping("/{idWorkshop}/{idAluno}")
    public ResponseEntity<?> deleteCertificado(@PathVariable Integer idWorkshop, @PathVariable String idAluno) {
        return certificadoService.deleteCertificado(idWorkshop, idAluno);
    }

    @GetMapping("/gerar-pdf")
    public ResponseEntity<?> generateCertificatePdf(
            @RequestParam String idAluno,
            @RequestParam int idWorkshop) {
        return certificadoService.generateCertificatePdf(idAluno, idWorkshop);
    }
}
