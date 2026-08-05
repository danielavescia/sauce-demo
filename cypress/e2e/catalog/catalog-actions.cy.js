describe('Cart', () => {
    let user;
    let products = [];

    before(() =>{
        cy.fixture('users').then((userData) => {
            user = userData.standard;
        });

        cy.fixture('products').then((productData) => {
            products.push(productData.backpack);
            products.push(productData.bikeLight);
        });
    });

    beforeEach(() => {
        cy.login({username: user.username,password: user.password});
        cy.assertOnCatalogPage();
    });

    context('when products are added to cart', () => {
        it('should add product when clicking Add to cart button', () => {
            products.forEach(product => {
                cy.addProductToCart(product);
                cy.assertRemoveButtonVisible(product);
            });
        });

        it('should display correct quantity of products in carts badge', () => {
            let productsQnt = products.length;
            
            products.forEach(product => {
                cy.addProductToCart(product);
            });

            cy.assertProductQntBadge(productsQnt)
        });
    });

     context('when products are removed from cart', () => {
        it('should remove product when clicking Remove button', () => {
            products.forEach(product => {
                cy.addProductToCart(product);
                cy.assertRemoveButtonVisible(product);
                cy.removeProductFromCart(product);
                cy.assertAddTButtonVisible(product);
            });
        });

        it('should display correct quantity of products in carts badge after removal', () => {
            let productsQnt = products.length;
            
            products.forEach(product => {
                cy.addProductToCart(product);
            });

            cy.assertProductQntBadge(productsQnt);

            products.forEach(product => {
                cy.removeProductFromCart(product);
            });

            cy.assertProductQntBadgeNotVisible();
        });
    });
});