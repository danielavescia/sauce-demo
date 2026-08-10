import { catalogElements } from '../pages/catalog.elements';
import { checkoutS1Elements } from '../pages/checkout-s1.elements';
import { checkoutS2Elements } from '../pages/checkout-s2.elements';

Cypress.Commands.add('goToCheckoutStepOne', (product) => {
  cy.navigateToCatalogPage();
  cy.assertOnCatalogPage();

  cy.addProductToCart(product);

  cy.navigateToCart();
  cy.assertOnCartPage();

  cy.get(catalogElements.inventoryItem).should('have.length', 1);

  cy.navigateToCheckout();
  cy.assertOnCheckoutStepOne();
});

Cypress.Commands.add(
  'fillAndSubmitCheckoutStep1',
  ({ firstName = '', lastName = '', postalCode = '' } = {}) => {
    if (firstName) cy.get(checkoutS1Elements.fieldFirstName).type(firstName);
    if (lastName) cy.get(checkoutS1Elements.fieldLastName).type(lastName);
    if (postalCode) cy.get(checkoutS1Elements.fieldPostalCode).type(postalCode);
    cy.get(checkoutS1Elements.continueButton).click();
  }
);

Cypress.Commands.add('assertCheckoutStepOneError', (errorMessage) => {
  cy.assertOnCheckoutStepOne();
  cy.get(checkoutS1Elements.error).should('be.visible').and('have.text', errorMessage);
});

Cypress.Commands.add('goToCheckoutStepTwo', ({ firstName, lastName, postalCode } = {}, product) => {
  cy.goToCheckoutStepOne(product);
  cy.fillAndSubmitCheckoutStep1({ firstName, lastName, postalCode });
  cy.assertOnCheckoutStepTwo();
});

Cypress.Commands.add('assertOnCheckoutStepOne', () => {
  cy.url().should('contain', '/checkout-step-one.html');
  cy.get(checkoutS1Elements.checkoutS1Title).should('have.text', 'Checkout: Your Information');
});

Cypress.Commands.add('assertOnCheckoutStepTwo', () => {
  cy.url().should('contain', '/checkout-step-two.html');
  cy.get(checkoutS2Elements.checkoutS2Title).should('have.text', 'Checkout: Overview');
});
