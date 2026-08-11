describe('Catalog actions', () => {
  let user;
  let products;
  let productsQnt;

  beforeEach(() => {
    cy.fixture('users').then((usersData) => {
      user = usersData.standard;
    });

    cy.fixture('products').then((productsData) => {
      products = [productsData.backpack, productsData.bikeLight];
      productsQnt = products.length;
    });

    cy.then(() => {
      cy.loginBySession(user);
      cy.navigateToCatalogPage();
      cy.assertOnCatalogPage();
    });
  });

  context('when products are added to cart', () => {
    it('should add product when clicking Add to cart button', () => {
      cy.addProductsToCart(products);

      products.forEach((product) => {
        cy.assertRemoveButtonVisible(product);
      });
    });

    it('should display correct quantity of products in carts badge', () => {
      cy.addProductsToCart(products);

      cy.assertProductQntBadge(productsQnt);
    });
  });

  context('when products are removed from cart', () => {
    it('should remove product when clicking Remove button', () => {
      cy.addProductsToCart(products);

      products.forEach((product) => {
        cy.assertRemoveButtonVisible(product);
        cy.removeProductFromCart(product);
        cy.assertAddButtonVisible(product);
      });
    });

    it('should display correct quantity of products in carts badge after removal', () => {
      cy.addProductsToCart(products);

      cy.assertProductQntBadge(productsQnt);

      products.forEach((product) => {
        cy.removeProductFromCart(product);
      });

      cy.assertProductQntBadgeNotVisible();
    });
  });
});
