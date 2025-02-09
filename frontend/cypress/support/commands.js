Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/professores/login',
        qs: {
            email: 'julio@gmail.com',
            senha: 'juliano12'
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        localStorage.setItem('authToken', response.body.token);
    });
});
