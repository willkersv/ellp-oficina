const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // A URL onde o React está rodando
    specPattern: "cypress/e2e/**/*.cy.js",  // Confirma que ele está procurando no local certo
  },
});
