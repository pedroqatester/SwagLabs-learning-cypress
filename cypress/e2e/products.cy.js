import loginPages from '../support/pages/loginPages'
import messages from '../support/pages/messages'
import productsPages from '../support/pages/productsPages'
import { validateSortOrder } from '../support/utils'

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
        productsPages.productList
        .should('be.visible')
        .children()
        .should('have.length', 6)
    })
    it('Deve validar o menu lateral', () => {
        productsPages.openSideMenu()
        productsPages.sideMenu
        .should('be.visible')
        productsPages.logoutLink
        .should('be.visible').and('have.text', 'Logout')
        cy.get('a#about_sidebar_link').should('be.visible').and('have.text', 'About')
        cy.get('a#reset_sidebar_link').should('be.visible').and('have.text', 'Reset App State')
        productsPages.closeSideMenu()
        productsPages.sideMenu.should('not.be.visible')
        
    })
    it('Deve validar o funcionamento do filtro Low to high', () => {
        productsPages.sortDropdown.select('Price (low to high)')
        validateSortOrder('low to high')
    })
    it('Deve validar o funcionamento do filtro High to low', () => {
        productsPages.sortDropdown.select('Price (high to low)')
        validateSortOrder('high to low')
    })
})
