import loginPages from '../support/pages/loginPages'
import messages from '../support/pages/messages'

describe('Valida tela de products', () => {
  beforeEach(() => {
    loginPages.visit()
    cy.login('standard')
  })
    it('Deve exibir o título correto da página', () => {
        cy.title()
        .should('eq', 'Swag Labs')
    })
    it('Deve validar a exibição de produtos', () => {
        cy.get('.inventory_list')
          .should('be.visible')
          .children()
          .should('have.length.greaterThan', 0)
    })
})