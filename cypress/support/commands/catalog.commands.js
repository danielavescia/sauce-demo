const{catalogElements} = require("../pages/catalog.elements");

Cypress.Commands.add('assertOnCatalogPage', () => {
        cy.url().should('contain', '/inventory')
        cy.get(catalogElements.inventoryList).should('be.visible');
});

Cypress.Commands.add('addProductToCart', (product) => {
    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').as('addBackPack')
    
    cy.get('@addBackPack')
        .should('be.visible')
        .click();

    cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
})