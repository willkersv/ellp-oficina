# ELLP - Ensino Lúdico de Lógica e Programação

Este projeto é desenvolvido como parte do programa de extensão ELLP - Ensino Lúdico de Lógica e Programação. A aplicação é um sistema fullstack focado no cadastro e emissão de certificados para alunos voluntários, com funcionalidades específicas para usuários e administradores.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Estratégia de Testes](#estratégia-de-testes)
- [Instalação e Configuração](#instalação-e-configuração)
- [Licença](#licença)

---

## 📖 Sobre o Projeto

O sistema é projetado para gerenciar o cadastro e a emissão de certificados para os participantes do projeto ELLP. Com uma visão diferenciada para usuários e administradores, a aplicação permite que:
- **Usuários** se cadastrem, visualizem e se inscrevam em projetos e acessem seus certificados.
- **Administradores** gerenciem projetos e emitam certificados de conclusão para os alunos voluntários.

---

## 🚀 Funcionalidades

### Usuários
- **Cadastro e Autenticação**: Registro e login.
- **Visualização de Projetos**: Listagem de projetos disponíveis.
- **Inscrição em Projetos**: Participação em projetos específicos.
- **Acesso a Certificados**: Visualização e download de certificados emitidos.

### Administradores
- **Gestão de Usuários**: Cadastro, edição e exclusão de contas.
- **Criação e Edição de Projetos**: Gerenciamento de novos e existentes projetos.
- **Emissão de Certificados**: Configuração e geração de certificados para os participantes.
- **Relatórios**: Visualização de relatórios sobre participantes e certificados emitidos.

---

## 🏛 Arquitetura do Sistema

- **Frontend**: Interface de usuário construída em React.js (ou Vue.js), que interage com a API do backend.
- **Backend**: Servidor desenvolvido em Java Spring Boot, gerenciando a lógica de negócios, autenticação e API.
- **Banco de Dados**: PostgreSQL (ou MySQL) para armazenamento de dados, incluindo usuários, projetos e certificados.
- **Gestão de Certificados**: Geração e armazenamento de certificados em PDF, usando uma biblioteca Java, como iText.
  
A comunicação entre frontend e backend é feita por meio de APIs RESTful, permitindo operações CRUD e acesso aos dados de forma segura e eficiente.

---

## 💻 Tecnologias Utilizadas

- **Backend**: [Java Spring Boot](https://spring.io/projects/spring-boot)
- **Frontend**: [React.js](https://reactjs.org/) (ou [Vue.js](https://vuejs.org/))
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (ou MySQL)
- **Geração de Certificados**: Biblioteca Java [iText](https://itextpdf.com/) para criação de PDFs
- **Controle de Estado**: [Redux](https://redux.js.org/) (ou Context API do React)
- **Hospedagem**:
  - Frontend: [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/)
  - Backend: [Heroku](https://www.heroku.com/), [AWS](https://aws.amazon.com/) ou [DigitalOcean](https://www.digitalocean.com/)
- **Controle de Versionamento**: [GitHub](https://github.com/) ou [GitLab](https://about.gitlab.com/)

---

## 📝 Requisitos Funcionais

### Funcionalidades para Usuários
1. **Cadastro e Login**: Usuários podem se registrar e fazer login no sistema.
2. **Visualização de Projetos**: Acesso aos projetos disponíveis.
3. **Inscrição em Projetos**: Participação em projetos selecionados.
4. **Acesso aos Certificados**: Usuários podem baixar certificados após a conclusão dos projetos.

### Funcionalidades para Administradores
1. **Gestão de Usuários**: Adicionar, editar e remover contas de usuários.
2. **Gerenciamento de Projetos**: Criar, editar e excluir projetos disponíveis.
3. **Emissão de Certificados**: Configurar e gerar certificados personalizados para cada projeto.
4. **Relatórios e Análises**: Acesso a relatórios detalhados de participação e emissão de certificados.

---

## 🧪 Estratégia de Testes

1. **Testes Unitários**: Validação da lógica de métodos individuais (ex: cadastro, criação de projetos).
   - Framework: JUnit (backend).
   
2. **Testes de Integração**: Garantia da correta interação entre componentes (API e banco de dados).
   - Framework: Spring Test.

3. **Testes de Interface (UI)**: Verificação das interações de interface para usuários e administradores.
   - Framework: Cypress.

4. **Testes End-to-End (E2E)**: Simulação do fluxo completo do usuário, desde o cadastro até a geração de certificados.
   - Framework: Selenium WebDriver.

5. **Testes de Regressão**: Automatização de testes para evitar que novas funcionalidades causem problemas no sistema existente.
