describe('Testes de Cadastro de Workshop', () => {
    beforeEach(() => {
        cy.login(); // Função que garante o login do usuário antes de cada teste
        cy.visit('/cadastro-workshop'); // Acessa a página de cadastro de workshop
    });

    it('Deve permitir que o usuário preencha o formulário', () => {
        // Preenche os campos do formulário com dados válidos para o cadastro
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop de Testes');
        cy.get('textarea[placeholder="Descrição"]').type('Descrição detalhada do workshop.');
        cy.get('input[placeholder="Data do Workshop"]').type('2024-12-31');
        cy.get('input[placeholder="Duração (em horas)"]').type('2');

        // Verifica se os valores preenchidos nos campos são os esperados
        cy.get('input[placeholder="Título do Workshop"]').should('have.value', 'Workshop de Testes');
        cy.get('textarea[placeholder="Descrição"]').should('have.value', 'Descrição detalhada do workshop.');
        cy.get('input[placeholder="Data do Workshop"]').should('have.value', '2024-12-31');
        cy.get('input[placeholder="Duração (em horas)"]').should('have.value', '2');
    });

    it('Deve exibir mensagem de erro se a duração for inválida', () => {
        // Preenche os campos com uma duração inválida
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop com duração inválida');
        cy.get('textarea[placeholder="Descrição"]').type('Este workshop tem duração inválida.');
        cy.get('input[placeholder="Data do Workshop"]').type('2024-12-31');
        cy.get('input[placeholder="Duração (em horas)"]').type('-2'); // Duração inválida, número negativo

        // Clica no botão de envio
        cy.get('button[type="submit"]').click();

        // Verifica se a mensagem de erro sobre duração inválida é exibida
        cy.contains('A duração deve ser um número válido maior que zero.').should('be.visible');
    });

    it('Deve exibir mensagem de erro se a data for no passado', () => {
        // Preenche os campos com uma data no passado
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop com data no passado');
        cy.get('textarea[placeholder="Descrição"]').type('Este workshop tem uma data inválida.');
        cy.get('input[placeholder="Data do Workshop"]').type('2020-12-31'); // Data no passado
        cy.get('input[placeholder="Duração (em horas)"]').type('2');

        // Clica no botão de envio
        cy.get('button[type="submit"]').click();

        // Verifica se a mensagem de erro sobre data no passado é exibida
        cy.contains('A data do workshop não pode ser no passado.').should('be.visible');
    });

    it('Deve enviar o formulário com sucesso quando todos os campos forem preenchidos corretamente', () => {
        // Preenche os campos do formulário com dados válidos
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop de Cypress');
        cy.get('textarea[placeholder="Descrição"]').type('Aprenda a usar Cypress para testes end-to-end.');
        cy.get('input[placeholder="Data do Workshop"]').type('2026-12-31');
        cy.get('input[placeholder="Duração (em horas)"]').type('3');

        // Intercepta a requisição POST para simular o sucesso no backend
        cy.intercept('POST', 'http://localhost:8080/api/workshops', {
            statusCode: 201,
            body: { message: 'Workshop criado com sucesso!' }, // Simula sucesso na criação
        }).as('criarWorkshop');

        // Clica no botão de envio
        cy.get('button[type="submit"]').click();

        // Espera a requisição e verifica se a mensagem de sucesso é exibida
        cy.wait('@criarWorkshop');
        cy.contains('Workshop criado com sucesso!').should('be.visible');
    });

    it('Deve exibir uma mensagem de erro se a chamada da API falhar', () => {
        // Preenche os campos do formulário com dados válidos
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop de Cypress');
        cy.get('textarea[placeholder="Descrição"]').type('Aprenda a usar Cypress para testes end-to-end.');
        cy.get('input[placeholder="Data do Workshop"]').type('2026-12-31');
        cy.get('input[placeholder="Duração (em horas)"]').type('3');

        // Intercepta a requisição POST para simular uma falha no backend
        cy.intercept('POST', 'http://localhost:8080/api/workshops', {
            statusCode: 500, // Simula erro interno no servidor
        }).as('falhaCriarWorkshop');

        // Clica no botão de envio
        cy.get('button[type="submit"]').click();

        // Espera a requisição e verifica se a mensagem de erro da falha é exibida
        cy.wait('@falhaCriarWorkshop');
        cy.contains('Erro ao criar o workshop. Tente novamente.').should('be.visible');
    });
});
