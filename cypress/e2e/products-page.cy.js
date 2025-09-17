import loginPages from '../support/pages/loginPages'
import productsPages from '../support/pages/productsPages'

describe('Valida tela de products', () => {
    beforeEach(() => {
        loginPages.visit()
        cy.login('standard')
    })
    it('Deve acessar os detalhes do produto, validar item e preço', () => {
        productsPages.ViewProductDetails(2)
        cy.url().should('include', '/inventory-item.html')
        cy.get('[data-test="inventory-item-name"]').should('be.visible').and('contain.text', 'Sauce Labs')
        productsPages.itemDetailsPrice.should('be.visible').and('contain.text', '$')
    })
    it('Deve acessar os detalhes do produto e adicionar ao carrinho', () => {
        productsPages.ViewProductDetails(1)
        cy.url().should('include', '/inventory-item.html')
        productsPages.AddItemToCartFromDetails()
        productsPages.cartBadge
          .should('be.visible')
          .and('have.text', '1')
        productsPages.cartLink.click()
        cy.url().should('include', '/cart.html')
        cy.get('.cart_item').should('have.length', 1)
    })
    it('Deve acessar os detalhes do produto, adicionar ao carrinho e remover na tela de detalhes', () => {
        productsPages.ViewProductDetails(3)
        cy.url().should('include', '/inventory-item.html')
        productsPages.AddItemToCartFromDetails()
        productsPages.cartBadge
          .should('be.visible')
          .and('have.text', '1')
        cy.get('#remove').click()
        productsPages.cartBadge.should('not.exist')

    })    
})
