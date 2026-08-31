import { catalogElements } from '../../support/pages/catalog.elements';

describe('Catalog - known bugs', () => {
  let user;
  let products;

  beforeEach(() => {
    cy.fixture('users').then((usersData) => {
      user = usersData.visual;
    });

    cy.fixture('products').then((productsData) => {
      products = Object.values(productsData);
    });

    cy.then(() => {
      cy.loginBySession(user);
      cy.navigateToCatalogPage();
      cy.assertOnCatalogPage();
    });
  });

  context('when catalog loads for the visual', () => {
    it('it doenst display the expected product price', { tags: '@bug' }, () => {
      products.forEach((product) => {
        cy.contains(catalogElements.inventoryItem, product.name).within(() => {
          cy.get(catalogElements.productName).should('have.text', product.name);

          cy.get(catalogElements.productDescription).should('have.text', product.description);

          cy.get(catalogElements.productPrice).should('have.text', product.price);

          cy.get(catalogElements.productImg).should('have.attr', 'src').and('not.be.empty');
        });
      });
    });
  });
});
