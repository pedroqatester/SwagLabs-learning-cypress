import loginPages from '../support/pages/loginPages'
import messages from '../support/pages/messages'

describe('Valida tela de login', () => {
  beforeEach(() => {
    loginPages.visit()
  })
  it('Deve exibir o título correto da página', () => {
    cy.title()
    .should('eq', 'Swag Labs')
  })
  it('Deve validar campos obrigatórios', () => {
  loginPages.submit()
   
  loginPages.errorMessage()
    .should('be.visible')
    .and('contain', messages.usernameRequired)
  })

  it('Deve validar campo obrigatório em Password', () => {
  const user = Cypress.env('USERS').standard
  
  loginPages.fillUsername(user.username)
  loginPages.submit()
  loginPages.errorMessage()
    .should('be.visible')
    .and('contain', messages.passwordRequired)
  })

  it('Não deve permitir login com credenciais inválidas', () => {
  loginPages.login('invalid_user', 'invalid_password')
  loginPages.errorMessage()
    .should('be.visible')
    .and('contain', messages.invalidCredentials)
  })
  it('Deve permitir login com usuario standard_user', () => {
    cy.login('standard')

    // Valida se o usuário foi redirecionado para a página de produtos
    cy.get('.title')
      .should('be.visible')
      .should('have.text', 'Products')
    cy.url()
      .should('include', '/inventory.html')
  })
  const users = ['standard_user', 'problem_user', 'performance_glitch_user']
  users.forEach((user) => {
    it(`Deve permitir login com diversos usuarios ${user}`, () => {
      loginPages.login(user, 'secret_sauce')
      // Valida se o usuário foi redirecionado para a página de produtos
      // e se o título da página está correto
      cy.get('.title')
        .should('be.visible')
        .should('have.text', 'Products')
      cy.url()
        .should('include', '/inventory.html')
    })
  })
  it('Não deve permitir login de usuário bloqueado', () => {
    cy.login('locked')
    loginPages.errorMessage()
      .should('be.visible')
      .and('contain', messages.userLocked)
  })

  it('Deve validar que o login do performance_glitch_user é mais lento', () => {
    const tempoMinimoMs = 2000
    const tempoMaximoMS = 8000

    let inicio, fim

    cy.then(() => {
      inicio = performance.now()
    })
    cy.login('performance')

    cy.get('.title', { timeout: 10000 }).should('have.text', 'Products')
    .then(() => {
      fim = performance.now()
      const duracao = fim - inicio

      cy.log(`Duração do login: ${duracao.toFixed(0)} ms`)
      expect(duracao).to.be.greaterThan(tempoMinimoMs)
      expect(duracao).to.be.lessThan(tempoMaximoMS)
    })
  })
  })