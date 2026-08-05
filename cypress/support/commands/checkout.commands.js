const { checkoutS1Elements } = require('../pages/checkout-s1.elements');

Cypress.Commands.add('goToCheckoutStepOne', () => {
    cy.addProductToCart();
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item"]').should('have.length', 1);

    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');
});

Cypress.Commands.add('fillAndSubmitCheckoutStep1', ({ firstName = '', lastName = '', postalCode =''} = {} ) => {
    if(firstName) cy.get(checkoutS1Elements.fieldFirstName).type(firstName);
    if(lastName) cy.get(checkoutS1Elements.fieldLastName).type(lastName);
    if(postalCode) cy.get(checkoutS1Elements.fieldPostalCode).type(postalCode);
    cy.get(checkoutS1Elements.continueButton).click()
});

Cypress.Commands.add ('assertCheckoutStepOneError', (errorMessage) => {
    cy.url().should('include', '/checkout-step-one.html')
    cy.get(checkoutS1Elements.error)
                .should('be.visible')
                .and('have.text', errorMessage);
});

Cypress.Commands.add('goToCheckoutStepTwo', ({ firstName, lastName, postalCode } = {}) => {
    cy.goToCheckoutStepOne();
    cy.fillAndSubmitCheckoutStep1({ firstName, lastName, postalCode });
    cy.url().should('include', '/checkout-step-two.html');
})