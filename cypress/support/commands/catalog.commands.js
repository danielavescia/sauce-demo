import { catalogElements } from '../pages/catalog.elements';

Cypress.Commands.add('assertOnCatalogPage', () => {
        cy.url().should('contain', '/inventory')
        cy.get(catalogElements.inventoryList).should('be.visible');
});

Cypress.Commands.add('removeProductFromCart', (product)=> {
    cy.contains(catalogElements.inventoryItem, product.name)
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

Cypress.Commands.add('addProductsToCart', (products) => {
    products.forEach(product => {
        cy.addProductToCart(product);
   });
});

Cypress.Commands.add('assertRemoveButtonVisible', (product) => {
    cy.contains(catalogElements.inventoryItem, product.name)
        .find('button')
        .should('have.text', 'Remove')
        .and('be.visible')
});

Cypress.Commands.add('assertAddTButtonVisible', (product) => {
   cy.contains(catalogElements.inventoryItem, product.name)
        .find('button')
        .should('have.text', 'Add to cart')
        .and('be.visible')
});

Cypress.Commands.add('assertProductQntBadge', (quantity) => {
    cy.get(catalogElements.qntBadge).should('have.text', quantity);
});

Cypress.Commands.add('assertProductQntBadgeNotVisible', () => {
    cy.get(catalogElements.qntBadge).should('not.exist');
})

Cypress.Commands.add('navigateToCart', () => {
    cy.get(catalogElements.cartButton).click()
});

