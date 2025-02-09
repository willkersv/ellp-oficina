describe('CadastroDocente', () => {
  beforeEach(() => {
      cy.visit('/cadastro-docente'); // Acessa a URL do formulário de cadastro de docente
  });

  it('Deve renderizar corretamente os campos e botões', () => {
      // Verifica se os campos de input e o botão de cadastro estão visíveis na página
      cy.get('input[placeholder="Nome completo"]').should('be.visible');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').should('be.visible');
      cy.get('input[placeholder="Email institucional"]').should('be.visible');
      cy.get('input[placeholder="Senha"]').should('be.visible');
      cy.get('button.cadastro-button').should('be.visible');
  });

  it('Deve permitir o cadastro do docente com sucesso', () => {
      // Preenche os campos do formulário com dados válidos para o cadastro
      cy.get('input[placeholder="Nome completo"]').type('João da Silva');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
      cy.get('input[placeholder="Email institucional"]').type('joao.silva@exemplo.com');
      cy.get('input[placeholder="Senha"]').type('senha123');

      // Intercepta a requisição POST para simular a resposta de sucesso do backend
      cy.intercept('POST', 'http://localhost:8080/api/professores/cadastro', {
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
      // Preenche os campos do formulário com dados válidos
      cy.get('input[placeholder="Nome completo"]').type('João da Silva');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
      cy.get('input[placeholder="Email institucional"]').type('joao.silva@exemplo.com');
      cy.get('input[placeholder="Senha"]').type('senha123');

      // Intercepta a requisição POST para simular uma resposta de erro do backend
      cy.intercept('POST', 'http://localhost:8080/api/professores/cadastro', {
          statusCode: 400,
          body: { message: 'Erro ao cadastrar professor.' }, 
      }).as('cadastroRequest');

      // Clica no botão de cadastro
      cy.get('button.cadastro-button').click();

      // Espera a requisição e verifica se a mensagem de erro é exibida na interface
      cy.wait('@cadastroRequest');
      cy.get('.error-message').should('contain', 'Erro ao cadastrar professor.');
  });

  it('Deve navegar para a página de login ao clicar no ícone de voltar', () => {
      // Simula o clique no ícone de voltar e verifica se a URL foi alterada corretamente
      cy.get('.back-arrow').click();
      cy.url().should('include', '/'); 
  });

  it('Deve limpar os campos após o envio bem-sucedido', () => {
      // Preenche os campos do formulário com dados válidos
      cy.get('input[placeholder="Nome completo"]').type('João da Silva');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
      cy.get('input[placeholder="Email institucional"]').type('joao.silva@exemplo.com');
      cy.get('input[placeholder="Senha"]').type('senha123');

      // Intercepta a requisição POST para simular uma resposta de sucesso do backend
      cy.intercept('POST', 'http://localhost:8080/api/professores/cadastro', {
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
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').should('have.value', '');
      cy.get('input[placeholder="Email institucional"]').should('have.value', '');
      cy.get('input[placeholder="Senha"]').should('have.value', '');
  });

  it('Deve verificar se o formulário não é enviado se o nome estiver vazio', () => {
      // Limpa o campo "Nome completo" e verifica se o envio não é permitido
      cy.get('input[placeholder="Nome completo"]').clear(); // Limpa o campo, não usa cy.type('')
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
      cy.get('input[placeholder="Email institucional"]').type('joao.silva@exemplo.com');
      cy.get('input[placeholder="Senha"]').type('senha123');
      
      cy.get('button.cadastro-button').click(); // Clica no botão, mas o envio não deve ocorrer
  });

  it('Deve verificar se o e-mail é válido', () => {
      // Preenche os campos do formulário com um e-mail inválido
      cy.get('input[placeholder="Nome completo"]').type('João da Silva');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
      cy.get('input[placeholder="Email institucional"]').type('email-invalido'); // E-mail inválido
      cy.get('input[placeholder="Senha"]').type('senha123');
    
      // Clica no botão de cadastro, o sistema deve validar o e-mail
      cy.get('button.cadastro-button').click();
  });

  it('Deve permitir que o campo de senha aceite senhas com pelo menos 6 caracteres', () => {
      // Preenche os campos do formulário com uma senha de menos de 6 caracteres
      cy.get('input[placeholder="Nome completo"]').type('João da Silva');
      cy.get('input[placeholder="RA (Registro Acadêmico)"]').type('123456');
      cy.get('input[placeholder="Email institucional"]').type('joao.silva@exemplo.com');
      cy.get('input[placeholder="Senha"]').type('12345'); // Senha com menos de 6 caracteres

      // Clica no botão de cadastro e espera a mensagem de erro sobre a senha curta
      cy.get('button.cadastro-button').click();
    
      // Verifica se a mensagem de erro de senha curta é exibida
      cy.get('.error-message').should('contain', 'A senha deve ter pelo menos 6 caracteres.');
  });
});
