const LoginPage = {

    visitLogin(){
        cy.visit('/');
    },

    fillUsername(username) { 
        cy.get('[data-test="username"]').clear().type(username);
    },

    fillPassword(password) {
        cy.get('[data-test="password"]').clear().type(password);
    },

    submit(){
        cy.get('[data-test="login-button"]').click();
    },

    getErrorMessage() {
        return cy.get('[data-test="error"]');
    }
}

export default LoginPage;