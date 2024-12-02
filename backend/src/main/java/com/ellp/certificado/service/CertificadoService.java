package com.ellp.certificado.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ellp.certificado.model.Aluno;
import com.ellp.certificado.model.Certificado;
import com.ellp.certificado.model.Workshop;
import com.ellp.certificado.repository.AlunoRepository;
import com.ellp.certificado.repository.CertificadoRepository;
import com.ellp.certificado.repository.WorkshopRepository;

import java.util.Optional;

@Service
public class CertificadoService {

    @Autowired
    private CertificadoRepository certificadoRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private WorkshopRepository workshopRepository;

    public String adicionarCertificado(Certificado certificado) {
        // Verificar se o workshop existe
        Optional<Workshop> workshop = workshopRepository.findById(certificado.getWorkshop().getIdWorkshop());
        if (workshop.isEmpty()) {
            return "Workshop não encontrado.";
        }

        // Verificar se o aluno existe
        Optional<Aluno> aluno = alunoRepository.findById(certificado.getAluno().getIdAluno());
        if (aluno.isEmpty()) {
            return "Aluno não encontrado.";
        }

        // Salvar o certificado
        certificadoRepository.save(certificado);
        return "Certificado adicionado com sucesso!";
    }
}
