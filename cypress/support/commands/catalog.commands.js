const{catalogElements} = require("../pages/catalog.elements");

Cypress.Commands.add('getInventoryItems', () => {
        cy.url().should('contain', '/inventory')
        cy.get(catalogElements.inventoryList).should('be.visible');
});