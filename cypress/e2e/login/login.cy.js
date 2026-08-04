import LoginPage, { loginElements } from "../../support/pages/login.elements";

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

    context('with valid user', () => {
        
        it('should login with valid user', () => {
            cy.login({username: users.standard.username, password: users.standard.password});
            cy.location('pathname').should('include', "/inventory.html")

            cy.getCookie('session-username').should('have.property','value','standard_user');
        });
    });

    context('with invalid credentials', () => {
        
        it('should not login with invalid username', () => {
            cy.login({username:'user', password: users.standard.password});

            cy.assertLoginError(errors.invalidCredentials);
        });

        it('should not login with invalid password', () => {
            cy.login({username: users.standard.username, password: 'secret'});

            cy.assertLoginError(errors.invalidCredentials);
        });

        it('should not login with invalid username and password', () => {
            cy.login({username: 'user', password: 'secret'});

            cy.assertLoginError(errors.invalidCredentials);
        });
    });
   
    context('when required fields are missing', () => {
        beforeEach(() => cy.visit('/'));

        it('should not login with empty username and password', () => {
            cy.login();
           
            cy.assertLoginError(errors.usernameRequired);
        });

        it('should not login with empty username', () => {
            cy.login({password: users.standard.password})

            cy.assertLoginError(errors.usernameRequired);
        });

        it('should not login with empty password', () => {
            cy.login({username: users.standard.username})
            
            cy.assertLoginError(errors.passwordRequired);
        });
    });
   
    context('when input format is invalid', () => {

        it('should not login with uppercase credentials', () => {
            cy.login({username: users.standard.username.toUpperCase(), password: users.standard.password.toUpperCase()});

            cy.assertLoginError(errors.invalidCredentials);
        });

        it('should not login with empty spaces in credentials', () => {
            cy.login({username: 'standard_user ', password: ' secret_sauce'});
            
            cy.assertLoginError(errors.invalidCredentials);
        });

        it('should not login with blank spaces in credentials', () => {
            cy.login({username: '  ', password: '  '});

            cy.assertLoginError(errors.invalidCredentials);
        });
    });

    context('when user has restrictions', () => {

        it('should not login with locked out user', () => {
            cy.login({username: users.lockedOut.username, password: users.lockedOut.password});

            cy.assertLoginError(errors.lockedOutUser);
        });
    });  
});