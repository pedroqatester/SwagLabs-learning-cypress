Cypress.Commands.add('login', (username, password) => {
    cy.get('#user-name').type(username);
    cy.get('#password').type(password);
    cy.get('[data-test="login-button"]').click();
  })