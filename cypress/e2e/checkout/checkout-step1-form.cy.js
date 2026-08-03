describe('Checkout Step 1 - User information', () => {

    let user;

    const USER_DETAILS = {
        firstName: 'Standard', 
        lastName: 'User', 
        postalCode: '12345'
    };
    
    const ERRORS = {
        firstNameEmpty: 'Error: First Name is required', 
        lastNameEmpty: 'Error: Last Name is required', 
        postalCodeEmpty: 'Error: Postal Code is required'
    };

    before(() => {
        cy.fixture('users').then((data) => {
            user = data;
        });
    });

    beforeEach(() => {
        cy.login(user.standard.username, user.standard.password);
        
        cy.goToCheckoutStepOne();
    })

    context('when filling fields and submitting the form', () => {
       
        it('should advance to step 2', () => {
            cy.fillAndSubmitCheckoutStep1(USER_DETAILS);
            cy.url().should('include', '/checkout-step-two.html');
        })
    });

    context('when required fields are missing', () => {
       
        it('should not proceed to step 2 and error when first name is missing', () => {
            cy. fillAndSubmitCheckoutStep1({
                lastName : USER_DETAILS.lastName,
                postalCode: USER_DETAILS.postalCode
            });

            cy.validateErrorMessage(ERRORS.firstNameEmpty);
        });

         it('should not proceed to step 2 and show error when last name is missing', () => {
            cy.fillAndSubmitCheckoutStep1({
                firstName : USER_DETAILS.firstName,
                postalCode: USER_DETAILS.postalCode
            });

            cy.validateErrorMessage(ERRORS.lastNameEmpty);
        });

        it('should not proceed to step 2 and show error when postal code is missing', () => {
            cy.fillAndSubmitCheckoutStep1({
                firstName : USER_DETAILS.firstName,
                lastName: USER_DETAILS.lastName
            });

            cy.validateErrorMessage(ERRORS.postalCodeEmpty);
        });

        it('should not proceed  to step 2 and show first name error when all fields are empty', () => {
            cy.fillAndSubmitCheckoutStep1({});

            cy.validateErrorMessage(ERRORS.firstNameEmpty);
        });
    });
});