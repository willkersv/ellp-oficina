package com.ellp.certificado.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ellp.certificado.model.Workshop;

public interface WorkshopRepository extends JpaRepository<Workshop, Integer> {
    boolean existsByNome(String nome);
    boolean existsByNomeAndIdWorkshopNot(String nome, Integer id);
    Optional<Workshop> findByNome(String nome);
    List<Workshop> findByNomeContainingIgnoreCase(String nome);
}