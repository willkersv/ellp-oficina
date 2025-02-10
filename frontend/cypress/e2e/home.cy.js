describe('Home Page Tests', () => {
    beforeEach(() => {
        cy.login(); // Função que garante o login do usuário antes de cada teste
        cy.visit('/home'); // Acessa a página inicial do sistema
    });

    it('Deve carregar e exibir workshops corretamente', () => {
        // Intercepta a requisição GET para workshops e simula uma resposta com dois workshops
        cy.intercept('GET', 'http://localhost:8080/api/workshops', {
            statusCode: 200,
            body: [
                { idWorkshop: 1, nome: "Workshop Cypress", data: "2025-03-10", duracao: 3 },
                { idWorkshop: 2, nome: "Workshop React", data: "2025-04-15", duracao: 4 }
            ]
        }).as('getWorkshops');

        // Aguarda a resposta da interceptação e verifica os workshops exibidos
        cy.wait('@getWorkshops');
        cy.get('.workshop-title').should('have.length', 2); // Verifica se há dois workshops exibidos
        cy.contains('Workshop Cypress').should('be.visible'); // Verifica se o título "Workshop Cypress" é exibido
        cy.contains('Workshop React').should('be.visible');  // Verifica se o título "Workshop React" é exibido
    });

    it('Deve realizar logout corretamente', () => {
        // Clica no ícone de logout
        cy.get('.logout-icon').click();
        
        // Verifica se a URL foi alterada para a página de login após o logout
        cy.url().should('include', '/'); // A URL deve incluir '/'; indicando que a página de login foi carregada
    });
});
