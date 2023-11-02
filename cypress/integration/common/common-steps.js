import { When, Then, Before, After } from 'cypress-cucumber-preprocessor/steps'
import page from '../../po/index'

const loginPage = page('Login')

Before(() => {
  loginPage.login()
})

After(() => {
  loginPage.logout()
})

When('I open {string} page', (pageName) => {
  const targetPage = page(pageName)
  targetPage.openViaSideBar()
  if (pageName === 'Filters') targetPage.getFilterRows()
})

Then('{string} page opens', (pageName) => {
  const targetPage = page(pageName)
  cy.url().should('contain', targetPage.url)
})
