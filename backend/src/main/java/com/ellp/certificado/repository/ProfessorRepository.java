package com.ellp.certificado.repository;
import com.ellp.certificado.model.Professor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ProfessorRepository extends JpaRepository<Professor, String> {
    Professor findByEmail(String email);
    boolean existsByEmail(String email);
}
