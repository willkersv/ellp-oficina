describe('CadastroAluno', () => {
    beforeEach(() => {
        cy.login(); // Faz o login do usuário antes de cada teste
        cy.visit('/cadastro-aluno'); // Navega até a página de cadastro do aluno
    });

    it('Deve renderizar corretamente os campos e botões', () => {
        // Verifica se os campos de input e o botão de cadastro estão visíveis na página
        cy.get('input[placeholder="Nome completo"]').should('be.visible');
        cy.get('input[placeholder="Email institucional"]').should('be.visible');
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').should('be.visible');
        cy.get('input[placeholder="Curso"]').should('be.visible');
        cy.get('button.cadastro-button').should('be.visible');
    });

    it('Deve permitir o cadastro do aluno com sucesso', () => {
        // Preenche os campos do formulário com dados válidos para o cadastro
        cy.get('input[placeholder="Nome completo"]').type('Maria Oliveira');
        cy.get('input[placeholder="Email institucional"]').type('maria.oliveira@exemplo.com');
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('789012');
        cy.get('input[placeholder="Curso"]').type('Engenharia de Software');

        // Intercepta a requisição POST para simular a resposta de sucesso do backend
        cy.intercept('POST', 'http://localhost:8080/api/alunos', {
            statusCode: 200,
            body: 'Cadastro realizado com sucesso',
        }).as('cadastroRequest');

        // Clica no botão de cadastro
        cy.get('button.cadastro-button').click();

        // Espera a requisição e verifica se a mensagem de sucesso é exibida na interface
        cy.wait('@cadastroRequest');
        cy.get('.success-message').should('contain', 'Cadastro realizado com sucesso');
    });

    it('Deve exibir mensagem de erro se o cadastro falhar', () => {
        // Preenche os campos do formulário com dados válidos para o cadastro
        cy.get('input[placeholder="Nome completo"]').type('Maria Oliveira');
        cy.get('input[placeholder="Email institucional"]').type('maria.oliveira@exemplo.com');
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('789012');
        cy.get('input[placeholder="Curso"]').type('Engenharia de Software');

        // Intercepta a requisição POST para simular uma resposta de erro do backend
        cy.intercept('POST', 'http://localhost:8080/api/alunos', {
            statusCode: 400,
            body: { message: 'Erro ao cadastrar aluno.' },
        }).as('cadastroRequest');

        // Clica no botão de cadastro
        cy.get('button.cadastro-button').click();

        // Espera a requisição e verifica se a mensagem de erro é exibida na interface
        cy.wait('@cadastroRequest');
        cy.get('.error-message').should('contain', 'Erro ao cadastrar aluno.');
    });

    it('Deve navegar para a página inicial ao clicar no ícone de voltar', () => {
        // Simula o clique no ícone de voltar e verifica se a URL foi alterada corretamente
        cy.get('.back-arrow').click();
        cy.url().should('include', '/'); // Verifica se a URL contém "/"
    });

    it('Deve limpar os campos após o envio bem-sucedido', () => {
        // Preenche os campos do formulário com dados válidos
        cy.get('input[placeholder="Nome completo"]').type('Maria Oliveira');
        cy.get('input[placeholder="Email institucional"]').type('maria.oliveira@exemplo.com');
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('789012');
        cy.get('input[placeholder="Curso"]').type('Engenharia de Software');

        // Intercepta a requisição POST para simular uma resposta de sucesso do backend
        cy.intercept('POST', 'http://localhost:8080/api/alunos', {
            statusCode: 200,
            body: 'Cadastro realizado com sucesso',
        }).as('cadastroRequest');

        // Clica no botão de cadastro
        cy.get('button.cadastro-button').click();

        // Espera a requisição e verifica se a mensagem de sucesso é exibida
        cy.wait('@cadastroRequest');
        cy.get('.success-message').should('contain', 'Cadastro realizado com sucesso');

        // Verifica se os campos foram limpos após o cadastro com sucesso
        cy.get('input[placeholder="Nome completo"]').should('have.value', '');
        cy.get('input[placeholder="Email institucional"]').should('have.value', '');
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').should('have.value', '');
        cy.get('input[placeholder="Curso"]').should('have.value', '');
    });
});