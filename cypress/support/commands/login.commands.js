const { loginElements } = require("../pages/login.elements");

Cypress.Commands.add('login', (username, password) =>{
    cy.visit('/');
    cy.get(loginElements.usernameField).clear().type(username);
    cy.get(loginElements.passwordField).clear().type(password);
    cy.get(loginElements.submitButton).click();
});

Cypress.Commands.add('assertLoginError', (errorMessage) => {
    cy.location('pathname').should('eq', '/');
    
    cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain.text', errorMessage);
});