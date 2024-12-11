describe('Testes de Cadastro de Workshop', () => {
  
    beforeEach(() => {
        cy.visit('/cadastro-workshop'); // Ajuste para a rota correta
    });

    it('Deve permitir que o usuário preencha o formulário', () => {
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop de Testes');
        cy.get('textarea[placeholder="Descrição"]').type('Descrição detalhada do workshop.');
        cy.get('input[placeholder="Data do Workshop"]').type('2024-12-31');
        cy.get('input[placeholder="Duração (em horas)"]').type('2');
        
        // Verificar se os valores foram preenchidos corretamente
        cy.get('input[placeholder="Título do Workshop"]').should('have.value', 'Workshop de Testes');
        cy.get('textarea[placeholder="Descrição"]').should('have.value', 'Descrição detalhada do workshop.');
        cy.get('input[placeholder="Data do Workshop"]').should('have.value', '2024-12-31');
        cy.get('input[placeholder="Duração (em horas)"]').should('have.value', '2');
    });

    it('Deve exibir mensagem de erro se a duração for inválida', () => {
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop com duração inválida');
        cy.get('textarea[placeholder="Descrição"]').type('Este workshop tem duração inválida.');
        cy.get('input[placeholder="Data do Workshop"]').type('2024-12-31');
        cy.get('input[placeholder="Duração (em horas)"]').type('-2'); // Duração inválida

        cy.get('button[type="submit"]').click();

        cy.contains('A duração deve ser um número válido maior que zero.').should('be.visible');
    });

    it('Deve exibir mensagem de erro se a data for no passado', () => {
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop com data no passado');
        cy.get('textarea[placeholder="Descrição"]').type('Este workshop tem uma data inválida.');
        cy.get('input[placeholder="Data do Workshop"]').type('2020-12-31'); // Data no passado
        cy.get('input[placeholder="Duração (em horas)"]').type('2');

        cy.get('button[type="submit"]').click();

        cy.contains('A data do workshop não pode ser no passado.').should('be.visible');
    });

    it('Deve enviar o formulário com sucesso quando todos os campos forem preenchidos corretamente', () => {
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop de Cypress');
        cy.get('textarea[placeholder="Descrição"]').type('Aprenda a usar Cypress para testes end-to-end.');
        cy.get('input[placeholder="Data do Workshop"]').type('2024-12-31');
        cy.get('input[placeholder="Duração (em horas)"]').type('3');

        cy.intercept('POST', 'http://localhost:8080/api/workshops', {
            statusCode: 201,
            body: { message: 'Workshop criado com sucesso!' },
        }).as('criarWorkshop');

        cy.get('button[type="submit"]').click();

        cy.wait('@criarWorkshop');
        cy.contains('Workshop criado com sucesso!').should('be.visible');
    });

    it('Deve exibir uma mensagem de erro se a chamada da API falhar', () => {
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop de Cypress');
        cy.get('textarea[placeholder="Descrição"]').type('Aprenda a usar Cypress para testes end-to-end.');
        cy.get('input[placeholder="Data do Workshop"]').type('2024-12-31');
        cy.get('input[placeholder="Duração (em horas)"]').type('3');

        cy.intercept('POST', 'http://localhost:8080/api/workshops', {
            statusCode: 500,
        }).as('falhaCriarWorkshop');

        cy.get('button[type="submit"]').click();

        cy.wait('@falhaCriarWorkshop');
        cy.contains('Erro ao criar o workshop. Tente novamente.').should('be.visible');
    });
});
