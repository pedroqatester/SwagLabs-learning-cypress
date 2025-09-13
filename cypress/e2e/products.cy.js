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

describe('Valida adição de produtos ao carrinho', () => {
    beforeEach(() => {
        loginPages.visit()
        cy.login('standard')
        cy.url().should('include', '/inventory.html')
        })
  
  it('Deve adicionar um produto ao carrinho', () => {
    productsPages.AddItemToCart(2)
    productsPages.cartBadge
      .should('be.visible')
      .and('have.text', '1')
    productsPages.cartLink.click()
    cy.url().should('include', '/cart.html')
    cy.get('.cart_item').should('have.length', 1)
  })

  it('Deve adicionar vários produtos ao carrinho', () => {
    const itemsToAdd = [0, 1, 2];
    
    itemsToAdd.forEach((itemIndex) => {
      productsPages.AddItemToCart(itemIndex);
    });
    
    productsPages.cartBadge
      .should('be.visible')
      .and('have.text', itemsToAdd.length.toString()); 
      
    productsPages.cartLink.click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', itemsToAdd.length);
  })
  it('Deve remover um produto do carrinho', () => {
    productsPages.AddItemToCart(1)
    productsPages.cartBadge
      .should('be.visible')
      .and('have.text', '1')
      productsPages.cartLink.click()
      cy.url().should('include', '/cart.html')
      cy.get('.cart_item').should('have.length', 1)
      cy.get('.cart_item').find('button').click()
      cy.get('.cart_item').should('not.exist')
      productsPages.cartBadge.should('not.exist')
  })    
})

