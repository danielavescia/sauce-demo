describe('Cart', () => {

    let products = [];

    let user;

    let productsQnt;

    before(() => {
        cy.fixture('users').then((userData) => {
            user = userData.standard;
        });

        cy.fixture('products').then((productsData) => {
            products.push(productsData.backpack);
            products.push(productsData.onesie);
            productsQnt = products.length;
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

            cy.assertProductQuantityInCart(1);
            cy.assertProductInCart(products[0]);
        });

        it('should display multiple added products in cart', () => {
           cy.addProductsToCart(products)
            
            cy.navigateToCart();
            cy.assertOnCartPage();

            cy.assertProductQuantityInCart(productsQnt);

            products.forEach((product) => {
                cy.assertProductInCart(product);
            });  
        });
    });

    context('when removing products from cart', () => {
        it('it should remove item from cart', () => {
            cy.addProductToCart(products[0]);
            
            cy.navigateToCart();
            cy.assertOnCartPage();

            cy.assertProductQuantityInCart(1);
            
            cy.removeItemFromCart(products[0]);
            cy.assertProductQuantityInCart(0);
        });
    });

    context('when cart state changes', () => {
        it('should keep products in cart after page refresh', () => {
            cy.addProductToCart(products[0]);
            
            cy.navigateToCart();
            cy.assertOnCartPage();

            cy.assertProductQuantityInCart(1);
            
            cy.reload();
            cy.assertProductQuantityInCart(1);
            cy.assertProductInCart(products[0]);
        });
    });
});