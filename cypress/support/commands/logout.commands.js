import { logoutElements } from '../pages/logout.elements';

Cypress.Commands.add('assertMenuIsInvisible', () => {
  cy.get(logoutElements.menuContainer).should('have.property', 'hidden');
});

Cypress.Commands.add('performLogout', () => {
  cy.get(logoutElements.sideMenuButton).click();
  cy.get(logoutElements.menuContainer).should('be.visible');
  cy.get(logoutElements.logoutLink).click();
});
