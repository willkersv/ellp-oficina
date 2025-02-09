describe('Workshop Page Tests', () => {
    // Executado antes de cada teste para fazer login, interceptar APIs e acessar a página do workshop
    beforeEach(() => {
        cy.login(); // Realiza o login antes de cada teste
        cy.intercept('GET', 'http://localhost:8080/api/workshops/*', { fixture: 'workshop.json' }).as('getWorkshop'); // Intercepta a requisição para obter informações do workshop
        cy.intercept('GET', 'http://localhost:8080/api/alunos', { fixture: 'alunos.json' }).as('getAlunos'); // Intercepta a requisição para obter alunos
        cy.intercept('GET', '/api/certificados/alunosByworkshop*', { fixture: 'registeredStudents.json' }).as('getRegisteredStudents'); // Intercepta a requisição para obter alunos registrados no workshop

        cy.visit('/workshop/1'); // Acessa a página do workshop com ID 1
        cy.wait('@getWorkshop'); // Aguarda o carregamento das informações do workshop
        cy.wait('@getAlunos'); // Aguarda o carregamento dos alunos
        cy.wait('@getRegisteredStudents'); // Aguarda o carregamento dos alunos registrados
    });

    // Teste que verifica se as informações do workshop são exibidas corretamente
    it('Deve carregar informações do workshop corretamente', () => {
        cy.get('.workshop-title').should('contain', 'Workshop de React'); // Verifica o título do workshop
        cy.get('.workshop-info').should('contain', 'Data: 2024-05-10'); // Verifica a data do workshop
        cy.get('.workshop-info').should('contain', 'Duração: 4 horas'); // Verifica a duração do workshop
    });

    // Teste que verifica se é possível pesquisar e adicionar um aluno ao workshop
    it('Deve permitir pesquisar e adicionar um aluno ao workshop', () => {
        cy.get('.search-input').type('Maria'); // Digita "Maria" no campo de pesquisa
        cy.get('.search-dropdown-item').should('contain', 'Maria Oliveira'); // Verifica se o nome "Maria Oliveira" aparece na lista de pesquisa
        
        cy.intercept('POST', 'http://localhost:8080/api/certificados', { statusCode: 201 }).as('addStudent'); // Intercepta a requisição de adicionar aluno
        cy.get('.add-student-button').click(); // Clica no botão de adicionar aluno
        cy.wait('@addStudent'); // Aguarda a requisição de adicionar aluno ser completada

        cy.get('.search-input').should('have.value', ''); // Verifica se o campo de pesquisa foi limpo após a adição
    });

    // Teste que verifica se é possível remover um aluno do workshop
    it('Deve remover um aluno do workshop', () => {
        cy.intercept('DELETE', '/api/certificados/delete*', { statusCode: 200 }).as('deleteStudent'); // Intercepta a requisição de remoção de aluno
        cy.get('.lixeira-icon').first().click(); // Clica no ícone de lixeira do primeiro aluno
        cy.wait('@deleteStudent'); // Aguarda a requisição de remoção do aluno ser completada
    });

    // Teste que verifica se é possível gerar certificados para todos os alunos do workshop
    it('Deve gerar certificados para todos os alunos', () => {
        cy.intercept('POST', '/api/certificados/gerar-pdf-todos*', { statusCode: 200 }).as('generateCertificates'); // Intercepta a requisição de geração de certificados para todos
        cy.get('.generate-certificates-button').click(); // Clica no botão para gerar certificados para todos os alunos
        cy.wait('@generateCertificates'); // Aguarda a requisição ser completada

        // Verifica se o alerta de sucesso aparece após a geração dos certificados
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Certificados gerados para todos os alunos!');
        });
    });

    // Teste que verifica se é possível gerar certificado para um aluno específico
    it('Deve gerar certificado para um aluno específico', () => {
        cy.intercept('GET', '/api/certificados/gerar-pdf*', { statusCode: 200 }).as('generateSingleCertificate'); // Intercepta a requisição de geração de certificado para um aluno específico
        cy.get('.certificate-icon').first().click(); // Clica no ícone de certificado do primeiro aluno
        cy.wait('@generateSingleCertificate'); // Aguarda a requisição de geração do certificado ser completada

        // Verifica se o alerta de sucesso aparece após a geração do certificado
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Certificado gerado para o aluno');
        });
    });
});
