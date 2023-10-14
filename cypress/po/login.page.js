import { adminLogin, adminPassword } from '../../environment/constants.js'

class LoginPage {
  login () {
    cy.visit('/')
    cy.get('input[name="login"]').type(adminLogin)
    cy.get('input[name="password"]').type(adminPassword)
    cy.get('div[class*="login-button"] button').click()
    cy.wait(2000)
  }

  logout () {
    cy.get('div[class^=userBlock__avatar').click({ force: true })
    cy.get('div[class^=userBlock__menu-item').contains('Logout').click({ force: true })
  }
}

export default LoginPage
