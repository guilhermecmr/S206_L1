/// <reference = cypress>

describe("Testes de registro e login", () => {
  it("Teste de registro com sucesso", () => {
    criarUser()
    cy.get('h1').should("contain.text","Contact List")  
  })

  it("Teste de registro com falha", () => {
    cy.register(".",".")
    cy.get('#error').should("contain.text","User validation failed")  
  })

  it("Teste de login com sucesso", () => {
    let infos = criarUser()
    cy.login(infos[0],infos[1])
    cy.get('h1').should("contain.text","Contact List")  
  })

  it("Teste de login com falha", () => {
    let infos = criarUser()
    cy.login(infos[0],"senhaErrada")
    cy.get('#error').should("contain.text","Incorrect username or password")  
  })
})

describe("Testes de funcionalidade", () => {
  it("Teste de registro com sucesso", () => {
    criarUser()
    cy.get('#add-contact').click()
    cy.get('#firstName').type("Guilherme")
    cy.get('#lastName').type("Ribeiro")
    cy.get('#submit').click()
    cy.get('.contactTableBodyRow > :nth-child(2)').should("have.text","Guilherme Ribeiro")
  })

  it("Teste de registro com falha", () => {
    criarUser()
    cy.get('#add-contact').click()
    cy.get('#firstName').type("Guilherme")
    cy.get('#submit').click()
    cy.get('#error').should("have.text","Contact validation failed: lastName: Path `lastName` is required.")
  })
})

function criarUser(){
  let hora = new Date().getHours().toString()
  let minuto = new Date().getMinutes().toString()
  let segundo = new Date().getSeconds().toString()
  let ID = hora + minuto + segundo + "ID"
  let Senha = hora + minuto + segundo + "Senha"
  let infos = [ID, Senha]
  
  cy.register(ID,Senha)

  return infos
}
