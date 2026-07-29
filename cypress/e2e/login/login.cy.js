describe('Login', () => {

    beforeEach(() => {
         cy.visit('https://www.saucedemo.com/');
    })

    it('login with valid user', () => {
        cy.login('standard_user', 'secret_sauce');

        cy.url().should('eq', "https://www.saucedemo.com/inventory.html");
    });

    it('should not login with invalid username', () => {
        cy.login('user', 'secret_sauce');

        cy.assertLoginError('Username and password do not match any user');
    });

    it('should not login with invalid password', () => {
        cy.login('standard_user', 'secret');

        cy.assertLoginError('Username and password do not match any user');
    });

    it('should not login with invalid username and password', () => {
        cy.login('user', 'secret');

        cy.assertLoginError('Username and password do not match any user');
    });

    it('should not login with empty username and password', () => {
        cy.get('[data-test="login-button"]').click();
        
        cy.assertLoginError('Username is required');
    });

    it('should not login with empty username', () => {
        cy.get('[data-test="password"]').type('secret_sauce');

        cy.get('[data-test="login-button"]').click();

        cy.assertLoginError('Username is required');
    });

    it('should not login with empty password', () => {
        cy.get('[data-test="username"]').type('standard_user');

        cy.get('[data-test="login-button"]').click();

        cy.assertLoginError('Password is required');
    });

    it('should not login with uppercase credentials', () => {
        cy.login('STANDARD_USER', 'SECRET_SAUCE');

        cy.assertLoginError('Username and password do not match any user');
    });

    it('should not login with empty spaces in credentials', () => {
        cy.login('standard_user ', ' secret_sauce');
        
        cy.assertLoginError('Username and password do not match any user');
    });

    it('should not login with locked out user', () => {
        cy.login('locked_out_user', 'secret_sauce');

        cy.assertLoginError('user has been locked out');
    });

     it('should not login with blank spaces in credentials', () => {
        cy.login('  ', '  ');

        cy.assertLoginError('Username and password do not match any user');
    });
});



   

