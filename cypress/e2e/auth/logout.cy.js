describe('Logout', () => {
  let user;
  const errorAuth = "Epic sadface: You can only access '/inventory.html' when you are logged in.";

  beforeEach(() => {
    cy.fixture('users').then((usersData) => {
      user = usersData.standard;
    });

    cy.then(() => {
      cy.loginBySession(user);
      cy.navigateToCatalogPage();
      cy.assertOnCatalogPage();
    });
  });

  context('Succesfull logout', () => {
    it('should logout from catalog page and redirect to login page', () => {
      cy.performLogout();
      cy.assertOnLoginPage();
    });
    it('should invalidate session and cookie after logout', () => {
      cy.performLogout();
      cy.getCookie('session-username').should('not.exist');
    });
    it('should not allow access to protected routes after logout', () => {
      cy.performLogout();
      cy.navigateToCatalogPage();
      cy.assertOnLoginPage();
      cy.assertLoginError(errorAuth);
    });

    it('should not allow going back to protected page via browser back button after logout', () => {
      cy.performLogout();
      cy.go('back');
      cy.assertOnLoginPage();
      cy.assertLoginError(errorAuth);
    });

    it('should  allow log in after logout with the same user', () => {
      cy.performLogout();
      cy.login({ username: user.username, password: user.password });
      cy.assertOnCatalogPage();
      cy.getCookie('session-username').should('have.property', 'value', 'standard_user');
    });
  });
});
