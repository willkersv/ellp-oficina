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
    public ResponseEntity<String> adicionarCertificado(@RequestBody Certificado certificado) {
        String resultado = certificadoService.adicionarCertificado(certificado);

        if (resultado.equals("Certificado adicionado com sucesso!")) {
            return ResponseEntity.ok(resultado);
        } else {
            return ResponseEntity.badRequest().body(resultado);
        }
    }
}
