describe('login', () => {

    it('login with valid user', () => {
        cy.visit('https://www.saucedemo.com/')

        cy.log("filling out username")
        cy.get('[data-test="username"]').type("standard_user")

        cy.log("filling out password")
        cy.get('[data-test="password"]').type("secret_sauce")

        cy.log('submiting login form')
        cy.get('[data-test="login-button"]').click()

        cy.log('redirected to /inventory')
        cy.url().should('eq', "https://www.saucedemo.com/inventory.html")
    })
})