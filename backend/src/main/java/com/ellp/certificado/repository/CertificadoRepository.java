package com.ellp.certificado.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ellp.certificado.model.Certificado;
import com.ellp.certificado.model.CertificadoId;


public interface CertificadoRepository extends JpaRepository<Certificado, CertificadoId> {
    List<Certificado> findByAlunoIdAluno(String idAluno);
    List<Certificado> findByWorkshopIdWorkshop(Integer idWorkshop);

    @Modifying
    @Query("DELETE FROM Certificado c WHERE c.workshop.idWorkshop = :workshopId")
    void deleteByWorkshopId(@Param("workshopId") int workshopId);

    @Query("SELECT c FROM Certificado c WHERE c.workshop.idWorkshop = :idWorkshop")
    List<Certificado> findByWorkshopId(@Param("idWorkshop") int idWorkshop);

    void deleteByAlunoIdAluno(String idAluno);
}
