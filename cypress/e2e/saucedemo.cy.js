describe('Testes de Login - SauceDemo', () => {
  
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('Deve realizar login com sucesso', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('have.text', 'Products')
  })

  it('Deve exibir mensagem de erro ao tentar login com usuário bloqueado', () => {
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.')
  })
})