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
        cy.visit('/');
        cy.login(user.standard.username, user.standard.password);
        
        cy.addProductToCart();
        cy.get('[data-test="shopping-cart-link"]').click();
        
        cy.url().should('include', '/cart.html');
        cy.get('[data-test="inventory-item"]').should('have.length', 1);
        cy.get('[data-test="checkout"]').click();
        
        cy.url().should('include', '/checkout-step-one.html')
        cy.get('form').find('[data-test="firstName"]').as('fieldFirstName');
        cy.get('form').find('[data-test="lastName"]').as('fieldLastName');
        cy.get('form').find('[data-test="postalCode"]').as('fieldPostalCode');
        cy.get('[data-test="continue"]').as('continueButton');
    })

    context('when filling fields and submitting the form', () => {
       
        it('should advance to step 2', () => {
            cy.get('@fieldFirstName').type(USER_DETAILS.firstName);
            cy.get('@fieldLastName').type(USER_DETAILS.lastName);
            cy.get('@fieldPostalCode').type(USER_DETAILS.postalCode);
            cy.get('@continueButton').click();
            cy.url().should('include', '/checkout-step-two.html');
        })
    });

    context('when required fields are missing', () => {
       
        it('should not proceed to step 2 and error when first name is missing', () => {
            cy.get('@fieldLastName').type(USER_DETAILS.lastName);
            cy.get('@fieldPostalCode').type(USER_DETAILS.postalCode);
            cy.get('@continueButton').click();
            cy.url().should('include', '/checkout-step-one.html')
            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('have.text', ERRORS.firstNameEmpty);
        });

         it('should not proceed to step 2 and show error when last name is missing', () => {
            cy.get('@fieldFirstName').type(USER_DETAILS.firstName);
            cy.get('@fieldPostalCode').type(USER_DETAILS.postalCode);
            cy.get('@continueButton').click();
            cy.url().should('include', '/checkout-step-one.html')
            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('have.text', ERRORS.lastNameEmpty);
        });

        it('should not proceed to step 2 and show error when postal code is missing', () => {
            cy.get('@fieldFirstName').type(USER_DETAILS.firstName);
            cy.get('@fieldLastName').type(USER_DETAILS.lastName);
            cy.get('@continueButton').click();
            cy.url().should('include', '/checkout-step-one.html')
            cy.get('[data-test="error"]')
                .should('be.visible')  
                .and('have.text', ERRORS.postalCodeEmpty);
        });

        it('should not proceed  to step 2 and show first name error when all fields are empty', () => {
            cy.get('@continueButton').click();
            cy.url().should('include', '/checkout-step-one.html')
            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('have.text', ERRORS.firstNameEmpty);
        });
    });
});