package com.ellp.certificado.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ellp.certificado.model.Certificado;
import com.ellp.certificado.model.CertificadoId;


public interface CertificadoRepository extends JpaRepository<Certificado, CertificadoId> {
    List<Certificado> findByAlunoIdAluno(String idAluno);
    List<Certificado> findByWorkshopIdWorkshop(Integer idWorkshop);
}
