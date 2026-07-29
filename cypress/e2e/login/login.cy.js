describe('Login', () => {

    beforeEach(() => {
         cy.visit('https://www.saucedemo.com/');
    })

    it('login with valid user', () => {
        cy.get('[data-test="username"]').type("standard_user");
   
        cy.get('[data-test="password"]').type("secret_sauce");

        cy.get('[data-test="login-button"]').click();

        cy.url().should('eq', "https://www.saucedemo.com/inventory.html");
    });

     it('should not login with invalid username', () => {
        cy.get('[data-test="username"]').type("user");
   
        cy.get('[data-test="password"]').type("secret_sauce");

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user');

        cy.url().should('eq', "https://www.saucedemo.com/");
    });

    it('should not login with invalid password', () => {
        cy.get('[data-test="username"]').type("standard_user");
   
        cy.get('[data-test="password"]').type("secret");

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user');

        cy.url().should('eq', "https://www.saucedemo.com/");
    });

    it('should not login with invalid username and password', () => {
        cy.get('[data-test="username"]').type("user");
   
        cy.get('[data-test="password"]').type("secret");

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user');

        cy.url().should('eq', "https://www.saucedemo.com/");
    });

    it('should not login with empty username and password', () => {
        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('contain', 'Username is required');

        cy.url().should('eq', "https://www.saucedemo.com/");
    });

    it('should not login with empty username', () => {
        cy.get('[data-test="password"]').type('secret_sauce');

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('contain', 'Username is required');

        cy.url().should('eq', "https://www.saucedemo.com/");
    });

    it('should not login with empty password', () => {
        cy.get('[data-test="username"]').type('standard_user');

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('contain', 'Password is required');

        cy.url().should('eq', "https://www.saucedemo.com/");
    });

    it('should not login with uppercase credentials', () => {
        cy.get('[data-test="username"]').type("STANDARD_USER");
   
        cy.get('[data-test="password"]').type("SECRET_SAUCE");

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user');

        cy.url().should('eq', "https://www.saucedemo.com/");
    });

    it('should not login with uppercase credentials', () => {
        cy.get('[data-test="username"]').type("STANDARD_USER");
   
        cy.get('[data-test="password"]').type("SECRET_SAUCE");

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user');

        cy.url().should('eq', "https://www.saucedemo.com/");
    });

    it('should not login with empty spaces in credentials', () => {
        cy.get('[data-test="username"]').type("STANDARD_USER ");
   
        cy.get('[data-test="password"]').type(" SECRET_SAUCE");

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user');

        cy.url().should('eq', "https://www.saucedemo.com/");
    });

    it('should not login with locked out user', () => {
        cy.get('[data-test="username"]').type("locked_out_user");
   
        cy.get('[data-test="password"]').type("secret_sauce");

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('contain', 'user has been locked out');

        cy.url().should('eq', "https://www.saucedemo.com/");
    });
});



   

