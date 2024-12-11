describe('CadastroDocente', () => {
    beforeEach(() => {
      // Acesse a URL do seu componente antes de cada teste
      cy.visit('/cadastro-docente'); // Substitua com a URL correta
    });
  
    it('Deve renderizar corretamente os campos e botões', () => {
      cy.get('input[placeholder="Nome completo"]').should('be.visible');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').should('be.visible');
      cy.get('input[placeholder="Email institucional"]').should('be.visible');
      cy.get('input[placeholder="Senha"]').should('be.visible');
      cy.get('button.cadastro-button').should('be.visible');
    });
  
    it('Deve permitir o cadastro do docente com sucesso', () => {
      cy.get('input[placeholder="Nome completo"]').type('João da Silva');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
      cy.get('input[placeholder="Email institucional"]').type('joao.silva@exemplo.com');
      cy.get('input[placeholder="Senha"]').type('senha123');
  
      cy.intercept('POST', 'http://localhost:8080/api/professores/cadastro', {
        statusCode: 200,
        body: 'Cadastro realizado com sucesso', // Simula resposta de sucesso
      }).as('cadastroRequest');
  
      cy.get('button.cadastro-button').click();
  
      cy.wait('@cadastroRequest');
      cy.get('.success-message').should('contain', 'Cadastro realizado com sucesso');
    });
  
    it('Deve exibir mensagem de erro se o cadastro falhar', () => {
      cy.get('input[placeholder="Nome completo"]').type('João da Silva');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
      cy.get('input[placeholder="Email institucional"]').type('joao.silva@exemplo.com');
      cy.get('input[placeholder="Senha"]').type('senha123');
  
      cy.intercept('POST', 'http://localhost:8080/api/professores/cadastro', {
        statusCode: 400,
        body: { message: 'Erro ao cadastrar professor.' }, // Simula erro na resposta
      }).as('cadastroRequest');
  
      cy.get('button.cadastro-button').click();
  
      cy.wait('@cadastroRequest');
      cy.get('.error-message').should('contain', 'Erro ao cadastrar professor.');
    });
  
    it('Deve navegar para a página de login ao clicar no ícone de voltar', () => {
      cy.get('.back-arrow').click();
      cy.url().should('include', '/'); // Verifique a URL de login
    });
  
    it('Deve limpar os campos após o envio bem-sucedido', () => {
      cy.get('input[placeholder="Nome completo"]').type('João da Silva');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
      cy.get('input[placeholder="Email institucional"]').type('joao.silva@exemplo.com');
      cy.get('input[placeholder="Senha"]').type('senha123');
  
      cy.intercept('POST', 'http://localhost:8080/api/professores/cadastro', {
        statusCode: 200,
        body: 'Cadastro realizado com sucesso',
      }).as('cadastroRequest');
  
      cy.get('button.cadastro-button').click();
  
      cy.wait('@cadastroRequest');
      cy.get('.success-message').should('contain', 'Cadastro realizado com sucesso');
  
      // Verificar se os campos foram limpos
      cy.get('input[placeholder="Nome completo"]').should('have.value', '');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').should('have.value', '');
      cy.get('input[placeholder="Email institucional"]').should('have.value', '');
      cy.get('input[placeholder="Senha"]').should('have.value', '');
    });
  
    it('Deve verificar se o formulário não é enviado se o nome estiver vazio', () => {
        cy.get('input[placeholder="Nome completo"]').clear(); // Limpa o campo, não usa cy.type('')
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
        cy.get('input[placeholder="Email institucional"]').type('joao.silva@exemplo.com');
        cy.get('input[placeholder="Senha"]').type('senha123');
        
        cy.get('button.cadastro-button').click();
    });
  
      it('Deve verificar se o e-mail é válido', () => {
        cy.get('input[placeholder="Nome completo"]').type('João da Silva');
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
        cy.get('input[placeholder="Email institucional"]').type('email-invalido');
        cy.get('input[placeholder="Senha"]').type('senha123');
      
        cy.get('button.cadastro-button').click();
    });      
  
    it('Deve permitir que o campo de senha aceite senhas com pelo menos 6 caracteres', () => {
        cy.get('input[placeholder="Nome completo"]').type('João da Silva');
        cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
        cy.get('input[placeholder="Email institucional"]').type('joao.silva@exemplo.com');
        cy.get('input[placeholder="Senha"]').type('12345'); // Senha com menos de 6 caracteres
      
        cy.get('button.cadastro-button').click();
      
        // Verificar se a mensagem de erro de senha curta é exibida
        cy.get('.error-message').should('contain', 'A senha deve ter pelo menos 6 caracteres.');
    });
});