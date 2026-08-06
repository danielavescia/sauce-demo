import  { cartElements } from '../pages/cart.elements';

Cypress.Commands.add('assertOnCartPage', () => {
    cy.url().should('contain', '/cart.html');
    cy.get(cartElements.pageTitle).should('have.text', 'Your Cart')
});

Cypress.Commands.add('navigateToCheckout', () => {
    cy.get(cartElements.checkoutButton).click();
});

Cypress.Commands.add('removeItemFromCart', (product) => {
    cy.contains(cartElements.item, product.name)
        .find('button')
        .contains('Remove')
        .click();
});