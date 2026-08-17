describe('Checkout Step 2 - Order Review', () => {
  let user;
  let product;

  beforeEach(() => {
    cy.fixture('users').then((usersData) => {
      user = usersData.standard;
    });

    cy.fixture('products').then((productsData) => {
      product = productsData.backpack;
    });

    cy.then(() => {
      cy.loginBySession(user);
      cy.goToCheckoutStepTwo(user.checkoutDetails, product);
    });
  });

  context('when accessing the review step', () => {
    it('should display selected products with name, description, quantity and price correctly', () => {
      cy.verifyCheckoutProduct(product);
    });

    it('subtotal should be equal to item price', () => {
      cy.assertSubtotal(product);
    });
    it('total should be equal to item total plus tax', () => {
      cy.assertTotal(product);
    });

    it('tax should be equal to 8% of subtotal', () => {
      cy.assertTax(product);
    });

    it('should complete purchase and redirect to confirmation page', { tags: '@smoke' }, () => {
      cy.assertOnConfirmationPage();
    });
  });
});
