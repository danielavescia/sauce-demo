describe('Catalog', () => {
    
    let user;

    before(() => {
        cy.fixture('users').then((data) => {
            user = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        cy.login(user.standard.username, user.standard.password);
        cy.get('[data-test="inventory-list"]').as('inventoryList')
        cy.get('@inventoryList').should('be.visible');
        cy.get('@inventoryList').find('[data-test="inventory-item"]').as('inventoryItems')
    });

    context('when catalog loads', () => {
        it('should display the correct number of products', () => {
            cy.get('@inventoryItems')
                .should('have.length', 6);
        });

        it('should display img, name, description, price and button for each product', () => {
              cy.get('@inventoryItems').each(($el) => {
                cy.wrap($el).find('img.inventory_item_img').should('have.attr', 'src').and('not.be.empty');
                cy.wrap($el).find('[data-test="inventory-item-name"]').should('not.be.empty');
                cy.wrap($el).find('[data-test="inventory-item-desc"]').should('not.be.empty');
                cy.wrap($el).find('[data-test="inventory-item-price"]').should('not.be.empty').and('contain', '$');
                cy.wrap($el).find('button').should('have.text', 'Add to cart');
              });
        });

        it('should display correct data for know product', () => {
            cy.get('@inventoryItems').contains('[data-test="inventory-item"]','Sauce Labs Backpack')
                .within(() => {
                    cy.get('[data-test="inventory-item-name"]').should('have.text', 'Sauce Labs Backpack');
                    cy.get('[data-test="inventory-item-desc"]').should('have.text', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
                    cy.get('[data-test="inventory-item-price"]').should('have.text', '$29.99');
                    cy.get('img.inventory_item_img').should('have.attr', 'src').and('not.be.empty');
                });
        });
    });
});