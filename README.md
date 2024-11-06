# Oficina de Integração 2 - Cadastro e geração de certificados de alunos voluntários

## 📖 Sobre o Projeto

Este projeto foi desenvolvido para a disciplina "Oficina de Integração 2", com o objetivo de integrar conteúdos de disciplinas anteriores do curso de Engenharia de Software. O sistema apoia o projeto de extensão ELLP (Ensino Lúdico de Lógica e Programação). A aplicação é um sistema focado no cadastro e emissão de certificados para alunos voluntários.

---

## 📋 Equipe:

   - Júlio César Bernardo Leite - (RA: 2411415)
   - Jeferson Rocha - (RA: 1836161)
   - Willker Santana - (RA: 2298082)

---

## 🏛 Arquitetura do Sistema

- **Frontend**: Interface construída em React.js (ou Angular), que interage com o backend.
- **Backend**: Desenvolvido em Java Spring Boot, gerenciando a lógica de negócios.
- **Banco de Dados**: PostgreSQL (ou MySQL) para armazenamento de dados, incluindo alunos, projetos e certificados.
- **Gestão de Certificados**: Geração e armazenamento de certificados em PDF, usando uma biblioteca Java.
  
A comunicação entre frontend e backend é feita por meio de APIs REST, permitindo operações CRUD e acesso aos dados de forma segura e eficiente.

---

## 💻 Tecnologias Utilizadas

- **Backend**: Java Spring Boot.
- **Frontend**: React.js (ou Angular).
- **Banco de Dados**: PostgreSQL (ou MySQL).
- **Controle de Versionamento**: GitHub.
---

## 📝 Requisitos Funcionais

- **Sprint 1**:
  
  - **RF01**: O sistema deve permitir realizar o cadastro de professor.
  - **RF02**: O sistema deve permitir realizar o login de professor.
  - **RF03**: O sistema deve permitir realizar o cadastro de workshop.

- **Sprint 2**:
  
  - **RF04**: O professor deve ser capaz de realizar o cadastro de aluno.
  - **RF05**: O professor deve ser capaz de vincular um aluno ao workshop.
  - **RF06**: O sistema deve ser capaz de gerar um certificado para o aluno vinculado ao workshop.

---

## 🧪 Estratégia de Testes

1. **Testes Unitários**: Validação da lógica de métodos individuais (ex: cadastro, criação de projetos).
   - Framework: JUnit (backend).
   
2. **Testes de Integração**: Garantia da correta interação entre componentes (API e banco de dados).
   - Framework: Spring Test.
