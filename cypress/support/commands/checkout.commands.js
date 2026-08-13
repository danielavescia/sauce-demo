import { catalogElements } from '../pages/catalog.elements';
import { checkoutS1Elements } from '../pages/checkout-s1.elements';
import { checkoutS2Elements } from '../pages/checkout-s2.elements';
import { calculateTax, calculateTotal, parsePriceToFloat } from '../helpers/helper';

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

Cypress.Commands.add('verifyCheckoutProduct', (product) => {
  cy.get(checkoutS2Elements.product).within(() => {
    cy.get(checkoutS2Elements.productName).should('have.text', product.name);

    cy.get(checkoutS2Elements.productDescription).should('have.text', product.description);

    cy.get(checkoutS2Elements.productPrice).should('have.text', product.price);

    cy.get(checkoutS2Elements.productQnt).should('have.text', '1');
  });
});

Cypress.Commands.add('assertSubtotal', (product) => {
  cy.get(checkoutS2Elements.subtotal).should('contain', product.price);
});

Cypress.Commands.add('assertTotal', (product) => {
  cy.get(checkoutS2Elements.total).should('contain', calculateTotal(product.price));
});

Cypress.Commands.add('assertTax', (product) => {
  cy.get(checkoutS2Elements.tax).should('contain', calculateTax(parsePriceToFloat(product.price)));
});

Cypress.Commands.add('assertOnConfirmationPage', () => {
  cy.get(checkoutS2Elements.finishButton).click();
  cy.url().should('contain', '/checkout-complete.html');
  cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
});
