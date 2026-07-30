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
    });

    context('when catalog loads', () => {
        it('should display the correct number of products', () => {
            cy.get('@inventoryList')
                .find('[data-test="inventory-item"]')
                .should('have.length', 6);
        });

        it('should display img, name, description, price and button for each product', () => {
              cy.get('@inventoryList').find('[data-test="inventory-item"]').each(($el) => {
                cy.wrap($el).find('img.inventory_item_img').should('have.attr', 'src').and('not.be.empty');
                cy.wrap($el).find('[data-test="inventory-item-name"]').should('not.be.empty');
                cy.wrap($el).find('[data-test="inventory-item-desc"]').should('not.be.empty');
                cy.wrap($el).find('[data-test="inventory-item-price"]').should('not.be.empty').and('contain', '$');
                cy.wrap($el).find('button').should('have.text', 'Add to cart');
              });
        });
    });
});