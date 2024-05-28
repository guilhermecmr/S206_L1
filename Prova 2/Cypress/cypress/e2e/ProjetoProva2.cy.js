/// <reference = cypress>

describe("Testes de login e logout", () => {
  it("Teste de login com sucesso", () => {
    realizaLogin("standard_user","secret_sauce");
    cy.get('#react-burger-menu-btn').click()
    cy.get('[data-test="title"]').should("have.text","Products")
  })

  it("Teste de login com falha", () => {
    realizaLogin("standard_user","senhaerrada");
    cy.get('[data-test="error"]').should("have.text","Epic sadface: Username and password do not match any user in this service")
  })

  it("Teste de logout com sucesso", () => {
    realizaLogin("standard_user","secret_sauce");
    cy.get('#react-burger-menu-btn').click()
    cy.get('[data-test="logout-sidebar-link"]').click()
    cy.get('[data-test="login-button"]').should("be.visible")
   })
})

describe("Testes de adicionar produto", () => {
  it("Teste de produto adicionado com sucesso", () => {
    realizaLogin("standard_user","secret_sauce");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="inventory-item-name"]').should("have.text","Sauce Labs Backpack")
  })

  it("Teste de produto removido com sucesso", () => {
    realizaLogin("standard_user","secret_sauce");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="inventory-item-name"]').should("not.exist")
  })
})

function realizaLogin(username, password){
  cy.visit("https://www.saucedemo.com/")
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
}