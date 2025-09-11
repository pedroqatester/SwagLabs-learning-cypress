class ProductsPage {
    get productList() {
        return cy.get('.inventory_list')
    }
    get burgerMenuButton() {
        return cy.get('#react-burger-menu-btn')
    }
    get sideMenu() {
        return cy.get('.bm-menu-wrap')
    }
    get logoutLink() {
        return cy.get('#logout_sidebar_link')
    }
    get sortDropdown() {
        return cy.get('.product_sort_container')
    }
    get itemPrices() {
        return cy.get('.inventory_item_price')
    }
    get cartLink() {
        return cy.get('.shopping_cart_link')
    }
    get cartBadge() {
        return cy.get('.shopping_cart_badge')
    }
    openSideMenu() {
        this.burgerMenuButton.click()
    }
    closeSideMenu() {
        cy.get('#react-burger-cross-btn').click()
    }
    selectSortOption(option) {
        this.sortDropdown.select(option)
    }
    AddItemToCart(index) {
        cy.get('.inventory_item').eq(index).find('.btn_inventory').click()
    }
    sortProducsts(option) {
        this.sortDropdown.select(option)
    }
    AddProductsToCart(index) {
        cy.get('.inventory_item').eq(index).find('.btn_inventory').click()
    }
}
export default new ProductsPage()