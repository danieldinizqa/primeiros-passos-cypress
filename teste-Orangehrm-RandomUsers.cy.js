// Importa o arquivo de dados fixos (usuário e senha)
import userData from '../fixtures/user-data.json'

// Importa e configura a biblioteca Chance para gerar dados aleatórios
const Chance = require('chance')
const chance = new Chance()

describe('Orange HRM - Atualização de Perfil com Dados Randômicos', () => {

  // Objeto com os seletores CSS organizados para facilitar a manutenção
  const selectorsList = {
    usernameField: '[name="username"]',
    passwordField: '[name="password"]',
    loginButton: '.oxd-button',
    myInfoButton: ':nth-child(6) > .oxd-main-menu-item',
    firstNameField: '[name="firstName"]',
    lastNameField: "[name='lastName']",
    genericRadioButton: '.oxd-radio-wrapper',
    saveButton: 'button[type="submit"]',
  }

  // Definição de variáveis com dados aleatórios (Simulando pessoa real)
  const randomFirstName = chance.first()
  const randomLastName = chance.last()

  it('Deve atualizar as informações do usuário com sucesso', () => {
    
    // Módulo 1: Realizar o Login
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton).click()

    // Módulo 2: Navegar para a seção "My Info"
    cy.get(selectorsList.myInfoButton).click()
    
    // Módulo 3: Aguardar estabilidade da página
    // O OrangeHRM tem animações no menu. Esperamos 2 segundos para evitar que o menu cubra os campos.
    cy.wait(3000)

    // Módulo 4: Preencher Nome e Sobrenome Aleatórios
    // Usamos {force: true} no clear e no type para ignorar qualquer sobreposição visual do menu superior.
    cy.get(selectorsList.firstNameField)
      .should('be.visible')
      .clear({ force: true }) 
      .type(randomFirstName, { force: true, delay: 50 }) // delay simula digitação humana

    cy.get(selectorsList.lastNameField)
      .should('be.visible')
      .clear({ force: true })
      .type(randomLastName, { force: true, delay: 50 })

    // Módulo 5: Selecionar o Gênero (Masculino)
    // Localiza o botão de rádio que contém o texto "Male"
    cy.get(selectorsList.genericRadioButton)
      .contains('Male')
      .click({ force: true })

    // Módulo 6: Salvar as Alterações
    // O comando .first() garante que clicamos no primeiro botão "Save" da página (detalhes pessoais).
    cy.get(selectorsList.saveButton)
      .first()
      .click({ force: true }) 
    
    // Módulo 7: Validar o resultado
    // Verificamos se o balão de sucesso (Toast) apareceu e se o campo contém o novo nome.
    cy.get('.oxd-toast', { timeout: 20000 }) 
      .should('be.visible')
      .and('contain', 'Successfully Updated')

    cy.get(selectorsList.firstNameField).should('have.value', randomFirstName)
  })
})