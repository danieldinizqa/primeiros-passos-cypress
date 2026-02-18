describe('OrangeHRM - Testes de Login', () => {
  
  // Centralização dos seletores para fácil manutenção
  const selectorsList = {
    usernameField: '[name="username"]',
    passwordField: '[name="password"]',
    loginButton: '.oxd-button',
    sectionTitleTopBar: '.oxd-topbar-header-breadcrumb > .oxd-text',
    wrongCredentialAlert: '.oxd-alert'
  }

  // Executa antes de cada teste "it"
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('Login - Success', () => {
    cy.get(selectorsList.usernameField).type('Admin')
    cy.get(selectorsList.passwordField).type('admin123')
    cy.get(selectorsList.loginButton).click()
    
    // Validação de URL
    cy.location('pathname').should('eq', '/web/index.php/dashboard/index')
    
    // Validação visual de sucesso
    cy.get(selectorsList.sectionTitleTopBar).contains('Dashboard')
  })

  it('Login - Fail', () => {
    cy.get(selectorsList.usernameField).type('teste')
    cy.get(selectorsList.passwordField).type('admin123')
    cy.get(selectorsList.loginButton).click()
    
    // Validação da mensagem de erro
    cy.get(selectorsList.wrongCredentialAlert)
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })
})