package com.ellp.certificado.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ellp.certificado.model.Workshop;


public interface WorkshopRepository extends JpaRepository<Workshop, Integer> {}