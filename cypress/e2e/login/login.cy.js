describe('Login', () => {

    const errors = {
        invalidCredentials: 'Username and password do not match any user',
        usernameRequired: 'Username is required',
        passwordRequired: 'Password is required',
        lockedOutUser: 'user has been locked out'
    };

    let users;

    before((() => {
        cy.fixture('users').then((data) => {
            users = data;
        })
    }));

    beforeEach(() => {
         cy.visit('/');
    });

    context('with valid user', () => {
        
        it('should login with valid user', () => {
            cy.login(users.standard.username, users.standard.password);
            cy.location('pathname').should('include', "/inventory.html")

            cy.getCookie('session-username').should('have.property','value','standard_user');
        });
    });

    context('with invalid credentials', () => {
        
        it('should not login with invalid username', () => {
            cy.login('user', 'secret_sauce');

            cy.assertLoginError(errors.invalidCredentials);
        });

        it('should not login with invalid password', () => {
            cy.login('standard_user', 'secret');

            cy.assertLoginError(errors.invalidCredentials);
        });

        it('should not login with invalid username and password', () => {
            cy.login('user', 'secret');

            cy.assertLoginError(errors.invalidCredentials);
        });
    });
   
    context('when required fields are missing', () => {
        
        it('should not login with empty username and password', () => {
            cy.get('[data-test="login-button"]').click();
            
            cy.assertLoginError(errors.usernameRequired);
        });

        it('should not login with empty username', () => {
            cy.get('[data-test="password"]').type('secret_sauce');

            cy.get('[data-test="login-button"]').click();

            cy.assertLoginError(errors.usernameRequired);
        });

        it('should not login with empty password', () => {
            cy.get('[data-test="username"]').type('standard_user');

            cy.get('[data-test="login-button"]').click();

            cy.assertLoginError(errors.passwordRequired);
        });
    });
   
    context('when input format is invalid', () => {

        it('should not login with uppercase credentials', () => {
            cy.login(users.standard.username.toUpperCase(), users.standard.password.toUpperCase());

            cy.assertLoginError(errors.invalidCredentials);
        });

        it('should not login with empty spaces in credentials', () => {
            cy.login('standard_user ', ' secret_sauce');
            
            cy.assertLoginError(errors.invalidCredentials);
        });

        it('should not login with blank spaces in credentials', () => {
            cy.login('  ', '  ');

            cy.assertLoginError(errors.invalidCredentials);
        });
    });

    context('when user has restrictions', () => {

        it('should not login with locked out user', () => {
            cy.login(users.lockedOut.username, users.lockedOut.password);

            cy.assertLoginError(errors.lockedOutUser);
        });
    });  
});