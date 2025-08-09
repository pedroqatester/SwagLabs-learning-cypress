Cypress.Commands.add('login', (username, password) => {
    cy.get('#user-name').type(username);
    cy.get('#password').type(password);
    cy.get('[data-test="login-button"]').click();
  })

  Cypress.Commands.add('login', (userKey = 'standard') => {
    const user = Cypress.env('USERS')[userKey]
    if (!user) {
      throw new Error(`User key '${userKey}' not found in cypress.env.json`)
    }
    cy.get('#user-name').type(user.username)
    cy.get('#password').type(user.password)
    cy.get('[data-test="login-button"]').click()
  })  