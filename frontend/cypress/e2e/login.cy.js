describe('Teste de Login', () => {
    beforeEach(() => {
        // Visita a página de login antes de cada teste
        cy.visit('/');
    });

    it('Deve exibir o formulário de login corretamente', () => {
        // Verifica se o título está visível
        cy.contains('Login').should('be.visible');

        // Verifica se os campos de entrada e o botão estão presentes
        cy.get('input[placeholder="Nome de usuário"]').should('be.visible');
        cy.get('input[placeholder="Senha"]').should('be.visible');
        cy.contains('Entrar').should('be.visible');
        cy.contains('Realizar cadastro docente').should('be.visible');
    });

    it('Deve realizar o login com credenciais corretas', () => {
        // Insere valores válidos nos campos
        cy.get('input[placeholder="Nome de usuário"]').type('1@example.com');
        cy.get('input[placeholder="Senha"]').type('1');
        
        // Submete o formulário
        cy.contains('Entrar').click();
        
        // Verifica se houve redirecionamento para a página home
        cy.url().should('include', '/home');
    });

    it('Deve mostrar mensagem de erro com credenciais inválidas', () => {
        // Insere valores inválidos nos campos
        cy.get('input[placeholder="Nome de usuário"]').type('usuario@exemplo.com');
        cy.get('input[placeholder="Senha"]').type('senha123');
        
        // Submete o formulário
        cy.contains('Entrar').click();
    });

    it('Deve redirecionar para a página de cadastro docente', () => {
        // Clica no link para cadastro docente
        cy.contains('Realizar cadastro docente').click();
        
        // Verifica se houve redirecionamento para a página de cadastro
        cy.url().should('include', '/cadastro-docente');
    });

    it('Deve exibir erro ao tentar submeter sem preencher os campos', () => {
        // Clica no botão de entrar sem preencher os campos
        cy.contains('Entrar').click();
    });
});
