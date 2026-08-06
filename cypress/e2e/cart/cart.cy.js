import { cartElements } from "../../support/pages/cart.elements";

describe('Cart', () => {

    let products = [];

    let user;

    before(() => {
        cy.fixture('users').then((userData) => {
            user = userData.standard;
        });

        cy.fixture('products').then((productsData) => {
            products.push(productsData.backpack);
            products.push(productsData.onesie);
        });
    });

    beforeEach(() => {
        cy.login({username: user.username, password: user.password})
        cy.assertOnCatalogPage();
        cy.assertProductQntBadgeNotVisible();
    });

    context('when products are added to cart', () => {
        it('should display selected product in cart', () => {
            cy.addProductToCart(products[0]);
            
            cy.navigateToCart();
            cy.assertOnCartPage();

            cy.get(cartElements.itemsList).should('have.length', 1);
            cy.get(cartElements.item).within(() => {
                cy.get(cartElements.itemName).should('have.text', products[0].name);
                cy.get(cartElements.itemPrice).should('have.text', products[0].price);
                cy.get(cartElements.itemDescription).should('have.text', products[0].description)
            });
        });

        it('should display multiple added products in cart', () => {
            products.forEach((product) => {
                cy.addProductToCart(product);
            });
            
            cy.navigateToCart();
            cy.assertOnCartPage();

            cy.get(cartElements.item).should('have.length', 2);

            products.forEach((product) => {
                cy.contains(cartElements.item, product.name)
                    .within(() => {
                        cy.get(cartElements.itemName).should('have.text', product.name);
                        cy.get(cartElements.itemPrice).should('have.text', product.price);
                        cy.get(cartElements.itemDescription).should('have.text', product.description)
                });
            });  
        });
    });

    context('when removing products from cart', () => {
        it('it should remove', () => {
            cy.addProductToCart(products[0]);
            
            cy.navigateToCart();
            cy.assertOnCartPage();

            cy.get(cartElements.item).should('have.length', 1);
            
            cy.removeItemFromCart(products[0]);
            cy.get(cartElements.item).should('have.length', 0);
        });
    });

    context('when cart state changes', () => {
        it('should keep products in cart after page refresh', () => {
            cy.addProductToCart(products[0]);
            
            cy.navigateToCart();
            cy.assertOnCartPage();

            cy.get(cartElements.item).should('have.length', 1);
            
            cy.reload();
            cy.get(cartElements.item).should('have.length', 1);
        });
    });
});