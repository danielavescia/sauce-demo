describe('Checkout - known bugs', () => {
  let user;
  let product;

  beforeEach(() => {
    cy.fixture('users').then((usersData) => {
      user = usersData.problem;
    });

    cy.fixture('products').then((productsData) => {
      product = productsData.backpack;
    });

    cy.then(() => {
      cy.loginBySession(user);
      cy.goToCheckoutStepOne(product);
    });
  });

  context('when the problem_user fills checkout step 1 information', () => {
    it(
      'it not allow entering Last Name, not advancing to checktou step 2',
      { tags: '@bug' },
      () => {
        cy.fillAndSubmitCheckoutStep1({
          firstName: user.checkoutDetails.firstName,
          lastName: user.checkoutDetails.lastName,
          postalCode: user.checkoutDetails.postalCode,
        });
        cy.assertOnCheckoutStepTwo();
      }
    );
  });
});
