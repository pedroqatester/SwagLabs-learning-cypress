class LoginPage {
    visit() {
      cy.visit('https://www.saucedemo.com/')
    }
  
    usernameField() {
      return cy.get('#user-name')
    }
  
    passwordField() {
      return cy.get('#password')
    }
  
    loginButton() {
      return cy.get('[data-test="login-button"]')
    }
  
    errorMessage() {
      return cy.get('[data-test="error"]')
    }
  
    // Ações (métodos)
    fillUsername(user) {
      this.usernameField().clear().type(user)
    }
  
    fillPassword(pass) {
      this.passwordField().clear().type(pass)
    }
  
    submit() {
      this.loginButton().click()
    }
  
    // método pronto para usar no teste
    login(user, pass) {
      this.fillUsername(user)
      this.fillPassword(pass)
      this.submit()
    }
  }
  
  export default new LoginPage()