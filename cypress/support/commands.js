// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) =>{
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('assertLoginError', (errorMessage) => {
    cy.location('pathname').should('eq', '/');
    
    cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain.text', errorMessage);
});

Cypress.Commands.add('addProductToCart', () => {
    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').as('addBackPack')
    
    cy.get('@addBackPack')
        .should('be.visible')
        .click();

    cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
})