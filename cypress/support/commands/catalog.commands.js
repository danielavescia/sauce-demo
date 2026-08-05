const{catalogElements} = require("../pages/catalog.elements");

Cypress.Commands.add('assertOnCatalogPage', () => {
        cy.url().should('contain', '/inventory')
        cy.get(catalogElements.inventoryList).should('be.visible');
});

Cypress.Commands.add('removeProductFromCart', (product)=> {
    cy.get(catalogElements.inventoryItem, product.name)
        .find('button')
        .contains('Remove')
        .click();
});

Cypress.Commands.add('addProductToCart', (product) => {
    cy.contains(catalogElements.inventoryItem, product.name)
        .find('button')
        .contains('Add to cart')
        .click();
});

Cypress.Commands.add('assertRemoveButtonVisible', (product) => {
    cy.get(catalogElements.inventoryItem, product.name)
        .find('button')
        .should('have.text', 'Remove')
        .and('be.visible')
});

Cypress.Commands.add('assertAddTButtonVisible', (product) => {
   cy.get(catalogElements.inventoryItem, product.name)
        .find('button')
        .should('have.text', 'Add to Cart')
        .and('be.visible')
});

Cypress.Commands.add('navigateToCart', () => {
    cy.get(catalogElements.cartButton).click()
});