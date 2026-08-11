describe('Checkout Step 1 - User information', () => {
  let user;
  let product;
  const ERRORS = {
    firstNameEmpty: 'Error: First Name is required',
    lastNameEmpty: 'Error: Last Name is required',
    postalCodeEmpty: 'Error: Postal Code is required',
  };

  before(() => {
    cy.fixture('users').then((userData) => {
      user = userData.standard;
    });

    cy.fixture('products').then((productData) => {
      product = productData.backpack;
    });
  });

  beforeEach(() => {
    cy.loginBySession(user);

    cy.goToCheckoutStepOne(product);
  });

  context('when filling fields and submitting the form', () => {
    it('should advance to step 2', () => {
      cy.fillAndSubmitCheckoutStep1({
        firstName: user.checkoutDetails.firstName,
        lastName: user.checkoutDetails.lastName,
        postalCode: user.checkoutDetails.postalCode,
      });
      cy.assertOnCheckoutStepTwo();
    });
  });

  context('when required fields are missing', () => {
    it('should not proceed to step 2 and show error when first name is missing', () => {
      cy.fillAndSubmitCheckoutStep1({
        lastName: user.checkoutDetails.lastName,
        postalCode: user.checkoutDetails.postalCode,
      });

      cy.assertCheckoutStepOneError(ERRORS.firstNameEmpty);
    });

    it('should not proceed to step 2 and show error when last name is missing', () => {
      cy.fillAndSubmitCheckoutStep1({
        firstName: user.checkoutDetails.firstName,
        postalCode: user.checkoutDetails.postalCode,
      });

      cy.assertCheckoutStepOneError(ERRORS.lastNameEmpty);
    });

    it('should not proceed to step 2 and show error when postal code is missing', () => {
      cy.fillAndSubmitCheckoutStep1({
        firstName: user.checkoutDetails.firstName,
        lastName: user.checkoutDetails.lastName,
      });

      cy.assertCheckoutStepOneError(ERRORS.postalCodeEmpty);
    });

    it('should not proceed  to step 2 and show first name error when all fields are empty', () => {
      cy.fillAndSubmitCheckoutStep1({});

      cy.assertCheckoutStepOneError(ERRORS.firstNameEmpty);
    });
  });
});
