describe('Catalog actions', () => {
    let user;
    let products = [];
    let productsQnt;

    before(() =>{
        cy.fixture('users').then((userData) => {
            user = userData.standard;
        });

        cy.fixture('products').then((productData) => {
            products.push(productData.backpack);
            products.push(productData.bikeLight);
            productsQnt = products.length;
        });
    });

    beforeEach(() => {
        cy.login({username: user.username,password: user.password});
        cy.assertOnCatalogPage();
    });

    context('when products are added to cart', () => {
        it('should add product when clicking Add to cart button', () => {
            cy.addProductsToCart(products);
            
            products.forEach(product => {
                cy.assertRemoveButtonVisible(product);
            });
        });

        it('should display correct quantity of products in carts badge', () => {
            cy.addProductsToCart(products);

            cy.assertProductQntBadge(productsQnt)
        });
    });

     context('when products are removed from cart', () => {
        it('should remove product when clicking Remove button', () => {
            cy.addProductsToCart(products);

            products.forEach(product => {
                cy.assertRemoveButtonVisible(product);
                cy.removeProductFromCart(product);
                cy.assertAddButtonVisible(product);
            });
        });

        it('should display correct quantity of products in carts badge after removal', () => {
            cy.addProductsToCart(products);

            cy.assertProductQntBadge(productsQnt);

            products.forEach(product => {
                cy.removeProductFromCart(product);
            });
            
            cy.assertProductQntBadgeNotVisible();
        });
    });
});