const { checkoutElements } = require('../pages/checkout-s1.elements');

Cypress.Commands.add('goToCheckoutStepOne', () => {
    cy.addProductToCart();
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item"]').should('have.length', 1);

    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');
});

Cypress.Commands.add('fillAndSubmitCheckoutStep1', ({firstName = '', lastName = '', postalCode =''} = {}) => {
    if(firstName) cy.get(checkoutElements.fieldFirstName).type(firstName);
    if(lastName) cy.get(checkoutElements.fieldLastName).type(lastName);
    if(postalCode) cy.get(checkoutElements.fieldPostalCode).type(postalCode);
    cy.get(checkoutElements.continueButton).click()
});

Cypress.Commands.add ('validateErrorMessage', (errorMessage) => {
    cy.url().should('include', '/checkout-step-one.html')
    cy.get(checkoutElements.error)
                .should('be.visible')
                .and('have.text', errorMessage);
});