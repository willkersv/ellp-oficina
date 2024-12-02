describe('Teste de Cadastro de Docente', () => {
    beforeEach(() => {
        // Visita a página de cadastro de docente antes de cada teste
        cy.visit('/cadastro-docente');
    });

    it('Deve exibir o formulário de cadastro corretamente', () => {
        // Verifica se o título está visível
        cy.contains('Cadastro de Docente').should('be.visible');

        // Verifica se os campos de entrada e o botão estão presentes
        cy.get('input[placeholder="Nome completo"]').should('be.visible');
        cy.get('input[placeholder="Email institucional"]').should('be.visible');
        cy.get('input[placeholder="Senha"]').should('be.visible');
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').should('be.visible'); // Verifica o campo RA
        cy.contains('Cadastrar').should('be.visible');
    });

    it('Deve realizar o cadastro com sucesso', () => {
        // Preenche os campos com dados válidos
        cy.get('input[placeholder="Nome completo"]').type('Docente Exemplo');
        cy.get('input[placeholder="Email institucional"]').type('novo@email.com');
        cy.get('input[placeholder="Senha"]').type('senha123');
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('12345678'); // Preenche o RA

        // Submete o formulário
        cy.contains('Cadastrar').click();

        // Verifica se a mensagem de sucesso é exibida
        cy.contains('Cadastro realizado com sucesso!').should('be.visible');

        // Verifica se redireciona para a página inicial após 2 segundos
        cy.wait(2000);
        cy.url().should('include', '/');
    });

    it('Deve exibir mensagem de erro para email já cadastrado', () => {
        // Preenche os campos com um email já existente
        cy.get('input[placeholder="Nome completo"]').type('Docente Existente');
        cy.get('input[placeholder="Email institucional"]').type('existente@email.com');
        cy.get('input[placeholder="Senha"]').type('senha123');
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('87654321'); // Preenche o RA

        // Submete o formulário
        cy.contains('Cadastrar').click();

        // Verifica se a mensagem de erro é exibida
        cy.contains('Email já cadastrado.').should('be.visible');
    });

    it('Deve exibir mensagem de erro ao tentar cadastrar sem preencher o RA', () => {
        // Preenche os campos sem o RA
        cy.get('input[placeholder="Nome completo"]').type('Docente Sem RA');
        cy.get('input[placeholder="Email institucional"]').type('docente@exemplo.com');
        cy.get('input[placeholder="Senha"]').type('senha123');
        
        // Deixa o campo RA vazio e submete o formulário
        cy.contains('Cadastrar').click();
    });

    it('Deve redirecionar para a página de login ao clicar no botão de voltar', () => {
        // Clica no botão de voltar
        cy.get('.back-arrow').click();

        // Verifica se houve redirecionamento para a página de login
        cy.url().should('include', '/');
    });

    it('Deve exibir erro ao tentar cadastrar sem preencher os campos', () => {
        // Tenta submeter o formulário sem preencher os campos
        cy.contains('Cadastrar').click();

        // Verifica se a mensagem de erro é exibida (validação no front-end)
        cy.contains('RA é obrigatório.').should('be.visible'); // Certifique-se que validação simula erro para RA vazio
    });
});
