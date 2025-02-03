package com.ellp.certificado.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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

import jakarta.mail.internet.MimeMessage;

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

    @Autowired
    private JavaMailSender emailSender;

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

    public ResponseEntity<?> getAlunosByWorkshopNome(String nomeWorkshop) {

        Optional<Workshop> workshopOptional = workshopRepository.findByNome(nomeWorkshop);

        if (workshopOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Workshop não encontrado.");
        }

        Workshop workshop = workshopOptional.get();

        List<Certificado> certificados = certificadoRepository.findByWorkshopIdWorkshop(workshop.getIdWorkshop());

        if (certificados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nenhum aluno encontrado para este workshop.");
        }

        List<Aluno> alunos = certificados.stream()
                                         .map(Certificado::getAluno)
                                         .toList();

        return ResponseEntity.ok(alunos);
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

    public ResponseEntity<?> deleteAlunoFromWorkshop(String idAluno, String nomeWorkshop) {
        // Verifica se o aluno existe
        if (!alunoRepository.existsById(idAluno)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aluno não encontrado.");
        }

        // Busca o workshop pelo nome
        Optional<Workshop> workshopOptional = workshopRepository.findByNome(nomeWorkshop);
        if (workshopOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Workshop não encontrado.");
        }

        Workshop workshop = workshopOptional.get();

        // Verifica se o aluno está cadastrado nesse workshop
        CertificadoId certificadoId = new CertificadoId(idAluno, workshop.getIdWorkshop());
        if (!certificadoRepository.existsById(certificadoId)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O aluno não está cadastrado neste workshop.");
        }

        // Remove o certificado (vínculo entre aluno e workshop)
        certificadoRepository.deleteById(certificadoId);

        return ResponseEntity.ok("Aluno removido do workshop com sucesso!");
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

    public ResponseEntity<?> generateAndSendCertificatesForWorkshop(String nomeWorkshop) {
        // Busca o workshop pelo nome
        Optional<Workshop> workshopOptional = workshopRepository.findByNome(nomeWorkshop);

        if (workshopOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Workshop não encontrado.");
        }

        Workshop workshop = workshopOptional.get();

        // Busca todos os alunos vinculados ao workshop
        List<Certificado> certificados = certificadoRepository.findByWorkshopIdWorkshop(workshop.getIdWorkshop());

        if (certificados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nenhum aluno encontrado para este workshop.");
        }

        // Loop para gerar e enviar certificados para cada aluno
        int certificadosEnviados = 0;

        for (Certificado certificado : certificados) {
            Aluno aluno = certificado.getAluno();

            // Gera o certificado e envia por e-mail
            ResponseEntity<?> sucesso = generateCertificatePdf(aluno.getIdAluno(), workshop.getIdWorkshop());

            if (sucesso.getStatusCode() == HttpStatus.OK) {
                certificadosEnviados++;
            }
        }

        return ResponseEntity.ok(certificadosEnviados + " certificados gerados e enviados com sucesso!");
    }

    public ResponseEntity<?> generateCertificatePdf(String idAluno, int idWorkshop) {
        Optional<Certificado> certificadoOptional = certificadoRepository.findByAlunoIdAlunoAndWorkshopIdWorkshop(idAluno, idWorkshop);

        if (certificadoOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Certificado não encontrado para o aluno e workshop fornecidos.");
        }

        Certificado certificado = certificadoOptional.get();
        Aluno aluno = certificado.getAluno();
        Workshop workshop = certificado.getWorkshop();

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 22, Font.BOLD);
            Font subtitleFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
            Font nameFont = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD);
            Font smallFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);

            Paragraph universityName = new Paragraph("Universidade Tecnológica Federal do Paraná", smallFont);
            universityName.setAlignment(Element.ALIGN_CENTER);
            universityName.setSpacingAfter(5);
            document.add(universityName);

            Paragraph campusName = new Paragraph("Campus de Cornélio Procópio", smallFont);
            campusName.setAlignment(Element.ALIGN_CENTER);
            campusName.setSpacingAfter(20);
            document.add(campusName);

            Paragraph title = new Paragraph("DECLARAÇÃO DE PARTICIPAÇÃO", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            Paragraph subtitle = new Paragraph(
                "O Projeto de Extensão ELLP (Ensino Lúdico de Lógica e Programação) declara que",
                subtitleFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            subtitle.setSpacingAfter(30);
            document.add(subtitle);

            Paragraph participantName = new Paragraph(aluno.getNome().toUpperCase(), nameFont);
            participantName.setAlignment(Element.ALIGN_CENTER);
            participantName.setSpacingAfter(30);
            document.add(participantName);

            Paragraph details = new Paragraph(
                String.format("participou do workshop %s, realizado em %s, com duração de %d hora(s).",
                    workshop.getNome(),
                    workshop.getData().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                    workshop.getDuracao()
                ),
                subtitleFont
            );
            details.setAlignment(Element.ALIGN_CENTER);
            details.setSpacingAfter(50);
            document.add(details);

            Paragraph footer = new Paragraph(
                String.format("Cornélio Procópio, %s\n\nContato: grupoellp@gmail.com\nProjeto de Extensão Ensino Lúdico de Lógica e Programação",
                    LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))),
                smallFont
            );
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();

            String rootPath = System.getProperty("user.dir");
            String assetsDirectory = rootPath + File.separator + "assets/certificados";
            new File(assetsDirectory).mkdirs();
            String filePath = assetsDirectory + File.separator + "certificado_" + idAluno + "_" + idWorkshop + ".pdf";

            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                fos.write(outputStream.toByteArray());
            }

            sendCertificateEmail(aluno.getEmail(), "Certificado de Participação - ELLP",
            "Olá " + aluno.getNome() + ",\n\nSegue em anexo o seu certificado de participação no workshop " +
                    workshop.getNome() + ".\n\nDescrição do workshop: " + workshop.getDescricao() +  ".\n\n\nAtenciosamente,\nEquipe ELLP", filePath);
            
            return ResponseEntity.ok("Certificado gerado e salvo com sucesso em: " + filePath);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao gerar o certificado: " + e.getMessage());
        }

        
    }

    private void sendCertificateEmail(String toEmail, String subject, String text, String filePath) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(text);

            File file = new File(filePath);
            if (file.exists()) {
                helper.addAttachment(file.getName(), file);
            } else {
                throw new RuntimeException("Arquivo não encontrado: " + filePath);
            }

            emailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao enviar o e-mail: " + e.getMessage());
        }
    }
}
