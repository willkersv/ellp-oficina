package com.ellp.certificado.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ellp.certificado.model.Aluno;
import com.ellp.certificado.model.Certificado;
import com.ellp.certificado.model.CertificadoId;
import com.ellp.certificado.model.Workshop;
import com.ellp.certificado.repository.AlunoRepository;
import com.ellp.certificado.repository.CertificadoRepository;
import com.ellp.certificado.repository.WorkshopRepository;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


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

    public Certificado getCertificado(String idAluno, int idWorkshop) {
        Optional<Certificado> certificado = certificadoRepository.findByAlunoIdAlunoAndWorkshopIdWorkshop(idAluno, idWorkshop);
        return certificado.orElseThrow(() -> new RuntimeException("Certificado não encontrado"));
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

    public ResponseEntity<?> generateCertificatePdf(String idAluno, int idWorkshop) {
        // Busca o certificado, aluno e workshop
        Optional<Certificado> certificadoOptional = certificadoRepository.findByAlunoIdAlunoAndWorkshopIdWorkshop(idAluno, idWorkshop);

        if (certificadoOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Certificado não encontrado para o aluno e workshop fornecidos.");
        }

        Certificado certificado = certificadoOptional.get();
        Aluno aluno = certificado.getAluno();
        Workshop workshop = certificado.getWorkshop();

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            // Configuração do documento PDF
            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // Fontes com tamanho aumentado e em negrito
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 22, Font.BOLD);
            Font subtitleFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
            Font nameFont = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD);
            Font smallFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);

            // Adicionando a Universidade antes do título
            Paragraph universityName = new Paragraph("Universidade Tecnológica Federal do Paraná", smallFont);
            universityName.setAlignment(Element.ALIGN_CENTER);
            universityName.setSpacingAfter(5);
            document.add(universityName);

            Paragraph campusName = new Paragraph("Câmpus de Cornélio Procópio", smallFont);
            campusName.setAlignment(Element.ALIGN_CENTER);
            campusName.setSpacingAfter(20);
            document.add(campusName);

            // Adicionando o título
            Paragraph title = new Paragraph("DECLARAÇÃO DE PARTICIPAÇÃO", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Adicionando subtítulo
            Paragraph subtitle = new Paragraph(
                "O Projeto de Extensão ELLP (Ensino Lúdico de Lógica e Programação) declara que",
                subtitleFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            subtitle.setSpacingAfter(30);
            document.add(subtitle);

            // Nome do participante
            Paragraph participantName = new Paragraph(aluno.getNome().toUpperCase(), nameFont);
            participantName.setAlignment(Element.ALIGN_CENTER);
            participantName.setSpacingAfter(30);
            document.add(participantName);

            // Detalhes do workshop
            Paragraph details = new Paragraph(
                String.format("participou do workshop %s, realizado em %s, com duração de %d horas.",
                    workshop.getNome(),
                    workshop.getData().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                    workshop.getDuracao()
                ),
                subtitleFont
            );
            details.setAlignment(Element.ALIGN_CENTER);
            details.setSpacingAfter(50);
            document.add(details);

            // Data e assinatura
            Paragraph footer = new Paragraph(
                String.format("Cornélio Procópio, %s\n\nContato: grupoellp@gmail.com\nProjeto de Extensão Ensino Lúdico de Lógica e Programação",
                    LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))),
                smallFont
            );
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();

            // Salvando no sistema de arquivos
            String rootPath = System.getProperty("user.dir"); // Diretório raiz do projeto
            String assetsDirectory = rootPath + File.separator + "assets/certificados";
            new File(assetsDirectory).mkdirs(); // Cria a pasta, se necessário
            String filePath = assetsDirectory + File.separator + "certificado_" + idAluno + "_" + idWorkshop + ".pdf";

            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                fos.write(outputStream.toByteArray());
            }

            return ResponseEntity.ok("Certificado gerado e salvo com sucesso em: " + filePath);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao gerar o certificado: " + e.getMessage());
        }
    }
}
