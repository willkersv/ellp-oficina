describe('Teste de Login', () => {
    // Função auxiliar para preencher o formulário de login com nome de usuário e senha
    const preencherFormulario = (username, password) => {
        if (username) cy.get('input[placeholder="Nome de usuário"]').type(username);
        if (password) cy.get('input[placeholder="Senha"]').type(password);
    };

    // Função auxiliar para verificar se a mensagem de erro aparece
    const verificarMensagemErro = (mensagem) => {
        cy.get('.error-message').contains(mensagem).should('be.visible');
    };

    // Executado antes de cada teste para visitar a página inicial e interceptar a requisição de login
    beforeEach(() => {
        cy.visit('/'); // Acessa a página inicial de login
        cy.intercept('POST', 'http://localhost:8080/api/professores/login').as('postLogin'); // Intercepta requisição POST de login
    });

    // Teste de exibição do formulário de login
    it('Deve exibir o formulário de login corretamente', () => {
        // Verifica se os elementos do formulário de login estão visíveis
        cy.contains('Login').should('be.visible');
        cy.get('input[placeholder="Nome de usuário"]').should('be.visible');
        cy.get('input[placeholder="Senha"]').should('be.visible');
        cy.contains('Entrar').should('be.visible'); // Verifica o botão de login
        cy.contains('Realizar cadastro docente').should('be.visible'); // Verifica link de cadastro docente
    });

    // Teste de login com credenciais válidas
    it('Deve realizar o login com credenciais corretas', () => {
        preencherFormulario('1@example.com', '1'); // Preenche o formulário com credenciais válidas
        cy.contains('Entrar').click(); // Clica no botão de login
        // Aqui você poderia adicionar verificações adicionais para garantir que o login foi bem-sucedido
    });

    // Teste de login com credenciais inválidas
    it('Deve mostrar mensagem de erro com credenciais inválidas', () => {
        preencherFormulario('usuario@exemplo.com', 'senha123'); // Preenche o formulário com credenciais inválidas
        cy.contains('Entrar').click(); // Clica no botão de login
        verificarMensagemErro('Credenciais inválidas'); // Verifica se a mensagem de erro aparece
    });

    // Teste de redirecionamento para a página de cadastro docente
    it('Deve redirecionar para a página de cadastro docente', () => {
        cy.contains('Realizar cadastro docente').click(); // Clica no link para realizar cadastro docente
        cy.url().should('include', '/cadastro-docente'); // Verifica se a URL inclui a rota de cadastro docente
    });

    // Teste de responsividade para dispositivos móveis
    it('Deve exibir corretamente em tela de dispositivos móveis', () => {
        cy.viewport('iphone-6'); // Define o tamanho da tela para um dispositivo móvel (iPhone 6)
        cy.contains('Login').should('be.visible'); // Verifica se a página de login está visível em dispositivos móveis
        cy.get('input[placeholder="Nome de usuário"]').should('be.visible');
        cy.get('input[placeholder="Senha"]').should('be.visible');
        cy.contains('Entrar').should('be.visible');
        cy.contains('Realizar cadastro docente').should('be.visible');
    });
});
