const { cartElements } = require('../pages/cart.elements.js');

Cypress.Commands.add('assertOnCartPage', () => {
    cy.url().should('contain', '/cart.html');
    cy.get(cartElements.pageTitle).should('have.text', 'Your Cart')
})

Cypress.Commands.add('navigateToCheckout', () => {
    cy.get(cartElements.checkoutButton).click();
})