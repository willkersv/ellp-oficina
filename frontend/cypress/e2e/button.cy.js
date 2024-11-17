describe("Teste do botão", () => {
    it("Deve exibir a mensagem ao clicar no botão", () => {
        // Acessar a página inicial do app React
        cy.visit("/");

        // Verificar se o botão está visível
        cy.contains("Clique aqui").should("be.visible");

        // Clicar no botão
        cy.contains("Clique aqui").click();

        // Verificar se a mensagem apareceu
        cy.get('[data-testid="message"]').should("contain", "Botão clicado!");
    });
});
