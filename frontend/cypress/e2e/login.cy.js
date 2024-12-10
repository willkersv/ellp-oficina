describe('Teste de Login', () => {
    const preencherFormulario = (username, password) => {
        if (username) cy.get('input[placeholder="Nome de usuário"]').type(username);
        if (password) cy.get('input[placeholder="Senha"]').type(password);
    };

    const verificarMensagemErro = (mensagem) => {
        cy.get('.error-message').contains(mensagem).should('be.visible');
    };

    beforeEach(() => {
        cy.visit('/');
        cy.intercept('POST', 'http://localhost:8080/api/professores/login').as('postLogin');
    });

    // Teste de exibição do formulário
    it('Deve exibir o formulário de login corretamente', () => {
        cy.contains('Login').should('be.visible');
        cy.get('input[placeholder="Nome de usuário"]').should('be.visible');
        cy.get('input[placeholder="Senha"]').should('be.visible');
        cy.contains('Entrar').should('be.visible');
        cy.contains('Realizar cadastro docente').should('be.visible');
    });

    // Teste de login com credenciais válidas
    it('Deve realizar o login com credenciais corretas', () => {
        preencherFormulario('1@example.com', '1');
        cy.contains('Entrar').click();
    });

    // Teste de login com credenciais inválidas
    it('Deve mostrar mensagem de erro com credenciais inválidas', () => {
        preencherFormulario('usuario@exemplo.com', 'senha123');
        cy.contains('Entrar').click();
        verificarMensagemErro('Credenciais inválidas');
    });

    // Teste de redirecionamento para cadastro docente
    it('Deve redirecionar para a página de cadastro docente', () => {
        cy.contains('Realizar cadastro docente').click();
        cy.url().should('include', '/cadastro-docente');
    });

    // Teste de responsividade
    it('Deve exibir corretamente em tela de dispositivos móveis', () => {
        cy.viewport('iphone-6');
        cy.contains('Login').should('be.visible');
        cy.get('input[placeholder="Nome de usuário"]').should('be.visible');
        cy.get('input[placeholder="Senha"]').should('be.visible');
        cy.contains('Entrar').should('be.visible');
        cy.contains('Realizar cadastro docente').should('be.visible');
    });
});
