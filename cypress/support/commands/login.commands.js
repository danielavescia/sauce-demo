import { loginElements } from '../pages/login.elements';

Cypress.Commands.add('login', ({ username = '', password = '' } = {}) => {
  cy.visit('/');

  if (username) {
    cy.get(loginElements.usernameField).clear();
    cy.get(loginElements.usernameField).type(username);
  }

  if (password) {
    cy.get(loginElements.passwordField).clear();
    cy.get(loginElements.passwordField).type(password);
  }

  cy.get(loginElements.submitButton).click();
});

Cypress.Commands.add('assertLoginError', (errorMessage) => {
  cy.location('pathname').should('eq', '/');

  cy.get(loginElements.errorMessage).should('be.visible').and('contain.text', errorMessage);
});
