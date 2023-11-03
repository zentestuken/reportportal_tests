class LoginPage {
  login () {
    cy.visit('/')
    cy.get('input[name="login"]').should('be.visible')
    cy.wait(2000)
    cy.get('input[name="login"]').type(Cypress.config('username'))
    cy.get('input[name="password"]').type(Cypress.config('password'))
    cy.get('div[class*="login-button"] button').click()
    cy.wait(2000)
  }

  logout () {
    cy.get('div[class^=userBlock__avatar').click({ force: true })
    cy.get('div[class^=userBlock__menu-item').contains('Logout').click({ force: true })
    cy.get('input[name="login"]').should('be.visible')
  }
}

export default LoginPage
