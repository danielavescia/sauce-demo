const { catalogElements } = require("../../support/pages/catalog.elements");

describe('Catalog', () => {
    
    let user;
    let products;

    before(() => {
        cy.fixture('users').then((userData) => {
            user = userData;
        });
        cy.fixture('products').then((productsData)=> {
            products = productsData;
        });
    });

    beforeEach(() => {
        cy.login({username: user.standard.username,password: user.standard.password});
        cy.assertOnCatalogPage();
    });

    context('when catalog loads', () => {
        it('should display the correct number of products', () => {
            cy.get(catalogElements.inventoryList)
                .find(catalogElements.inventoryItem)
                .should('have.length', 6);
        });

        it('should display img, name, description, price and button for each product', () => {
              cy.get(catalogElements.inventoryItem).each(($el) => {
                cy.wrap($el).find(catalogElements.productImg).should('have.attr', 'src').and('not.be.empty');
                cy.wrap($el).find(catalogElements.productName).should('not.be.empty');
                cy.wrap($el).find(catalogElements.productDescription).should('not.be.empty');
                cy.wrap($el).find(catalogElements.productPrice).should('not.be.empty').and('contain', '$');
                cy.wrap($el).find('button').should('have.text', 'Add to cart');
              });
        });

        it('should display correct data for every know product', () => {
            Object.values(products).forEach((product) => {
                cy.contains(catalogElements.inventoryItem, product.name)
                    .within(() => {
                        cy.get(catalogElements.productName).should('have.text', product.name);
                        
                        cy.get(catalogElements.productDescription).should('have.text', product.description);
                        
                        cy.get(catalogElements.productPrice).should('have.text', product.price);
                        
                        cy.get(catalogElements.productImg).should('have.attr', 'src').and('not.be.empty');
                    });
                });
            });
        });
});