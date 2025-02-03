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

    @GetMapping("/alunosByworkshop")
    public ResponseEntity<?> getAlunosByWorkshopNome(@RequestParam String nomeWorkshop) {
        return certificadoService.getAlunosByWorkshopNome(nomeWorkshop);
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<?> getByAluno(@PathVariable String idAluno) {
        return certificadoService.getByAluno(idAluno);
    }

    @GetMapping("/workshop/{idWorkshop}")
    public ResponseEntity<?> getByWorkshop(@PathVariable Integer idWorkshop) {
        return certificadoService.getByWorkshop(idWorkshop);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> removeAlunoDoWorkshop(
            @RequestParam String idAluno,
            @RequestParam String nomeWorkshop) {
        return certificadoService.deleteAlunoFromWorkshop(idAluno, nomeWorkshop);
    }

    @GetMapping("/gerar-pdf")
    public ResponseEntity<?> generateCertificatePdf(
            @RequestParam String idAluno,
            @RequestParam int idWorkshop) {
        return certificadoService.generateCertificatePdf(idAluno, idWorkshop);
    }

    @PostMapping("/gerar-pdf-todos")
    public ResponseEntity<?> generateAndSendCertificatesForWorkshop(@RequestParam String nomeWorkshop) {
        return certificadoService.generateAndSendCertificatesForWorkshop(nomeWorkshop);
    }
}
