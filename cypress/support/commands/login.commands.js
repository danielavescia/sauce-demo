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

Cypress.Commands.add('loginBySession', (user) => {
  cy.session(
    [user.username, user.password],
    () => {
      cy.login({ username: user.username, password: user.password });
    },
    {
      validate: () => {
        cy.getCookie('session-username').should('have.property', 'value', user.username);
      },
    }
  );
});

Cypress.Commands.add('assertOnLoginPage', () => {
  cy.get(loginElements.submitButton).should('be.visible');
  cy.url().should('eq', 'https://www.saucedemo.com/');
});
