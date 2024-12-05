package com.ellp.certificado.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ellp.certificado.model.Certificado;
import com.ellp.certificado.model.CertificadoId;
import com.ellp.certificado.repository.AlunoRepository;
import com.ellp.certificado.repository.CertificadoRepository;
import com.ellp.certificado.repository.WorkshopRepository;

import java.util.List;

@Service
public class CertificadoService {

    @Autowired
    private CertificadoRepository certificadoRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private WorkshopRepository workshopRepository;

    public ResponseEntity<?> getAllCertificado() {
        List<Certificado> certificados = certificadoRepository.findAll();
        if (certificados.isEmpty()) {
            return ResponseEntity.badRequest().body("Nenhum certificado encontrado.");
        }
        return ResponseEntity.ok(certificados);
    }

    public ResponseEntity<?> getByAluno(String idAluno) {
        if (!alunoRepository.existsById(idAluno)) {
            return ResponseEntity.badRequest().body("Aluno não encontrado.");
        }

        List<Certificado> certificados = certificadoRepository.findByAlunoIdAluno(idAluno);
        if (certificados.isEmpty()) {
            return ResponseEntity.badRequest().body("Nenhum certificado encontrado para o aluno.");
        }

        return ResponseEntity.ok(certificados);
    }

    public ResponseEntity<?> getByWorkshop(Integer idWorkshop) {
        if (!workshopRepository.existsById(idWorkshop)) {
            return ResponseEntity.badRequest().body("Workshop não encontrado.");
        }

        List<Certificado> certificados = certificadoRepository.findByWorkshopIdWorkshop(idWorkshop);
        if (certificados.isEmpty()) {
            return ResponseEntity.badRequest().body("Nenhum certificado encontrado para o workshop.");
        }

        return ResponseEntity.ok(certificados);
    }

    public ResponseEntity<?> createCertificado(Certificado certificado) {
        if (!alunoRepository.existsById(certificado.getAluno().getIdAluno())) {
            return ResponseEntity.badRequest().body("Aluno não encontrado.");
        }

        if (!workshopRepository.existsById(certificado.getWorkshop().getIdWorkshop())) {
            return ResponseEntity.badRequest().body("Workshop não encontrado.");
        }

        CertificadoId certificadoId = new CertificadoId(
            certificado.getAluno().getIdAluno(),
            certificado.getWorkshop().getIdWorkshop()
        );

        if (certificadoRepository.existsById(certificadoId)) {
            return ResponseEntity.badRequest().body("Certificado já cadastrado para este aluno neste workshop.");
        }

        certificadoRepository.save(certificado);
        return ResponseEntity.ok("Certificado adicionado com sucesso!");
    }

    public ResponseEntity<?> deleteCertificado(Integer idWorkshop, String idAluno) {
        CertificadoId certificadoId = new CertificadoId(idAluno, idWorkshop);
        if (!certificadoRepository.existsById(certificadoId)) {
            return ResponseEntity.badRequest().body("Certificado não encontrado.");
        }

        certificadoRepository.deleteById(certificadoId);
        return ResponseEntity.ok("Certificado excluído com sucesso!");
    }

}
