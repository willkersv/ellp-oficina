describe('Teste de Cadastro de Workshop', () => {
    beforeEach(() => {
        // Visita a página de cadastro de workshop antes de cada teste
        cy.visit('/cadastro-workshop');
    });

    it('Deve exibir o formulário de cadastro corretamente', () => {
        cy.contains('Criar Workshop').should('be.visible');
        cy.get('input[placeholder="Título do Workshop"]').should('be.visible');
        cy.get('textarea[placeholder="Descrição"]').should('be.visible');
        cy.get('input[placeholder="Data do Workshop"]').should('be.visible');
        cy.get('input[placeholder="Duração (em horas)"]').should('be.visible');
        cy.contains('Criar Workshop').should('be.visible');
    });

    it('Deve criar o workshop com sucesso', () => {
        cy.get('input[placeholder="Título do Workshop"]').type('Workshop de React');
        cy.get('textarea[placeholder="Descrição"]').type('Aprenda os fundamentos de React.');
        cy.get('input[placeholder="Data do Workshop"]').type('2024-12-01');
        cy.get('input[placeholder="Duração (em horas)"]').type('4');

        cy.contains('Criar Workshop').click();
    });

    it('Deve redirecionar para a página inicial ao clicar no botão de voltar', () => {
        cy.get('.back-arrow').click();
        cy.url().should('include', '/home');
    });
});
