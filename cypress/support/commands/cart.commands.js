import  { cartElements } from '../pages/cart.elements';

Cypress.Commands.add('assertOnCartPage', () => {
    cy.url().should('contain', '/cart.html');
    cy.get(cartElements.pageTitle).should('have.text', 'Your Cart')
});

Cypress.Commands.add('navigateToCheckout', () => {
    cy.get(cartElements.checkoutButton).click();
});

Cypress.Commands.add('removeItemFromCart', (product) => {
    cy.contains(cartElements.item, product.name)
        .find('button')
        .contains('Remove')
        .click();
});

Cypress.Commands.add('assertProductInCart', (product)=> {
    cy.contains(cartElements.item, product.name)
        .within(() => {
            cy.get(cartElements.itemName).should('have.text', product.name);
            cy.get(cartElements.itemPrice).should('have.text', product.price);
            cy.get(cartElements.itemDescription).should('have.text', product.description)
    });
})

Cypress.Commands.add('assertProductQuantityInCart', (productQnt)=> {
    cy.get(cartElements.item).should('have.length', productQnt);
})