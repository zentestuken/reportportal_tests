import FilterPage from '../../po/filter.page.js'
import LoginPage from '../../po/login.page.js'
import launchesPage from '../../po/launches.page.js'
import { getRandomString } from '../../support/helpers.js'

const filterPage = new FilterPage()
const loginPage = new LoginPage()
let randomFilterName
let randomFilterDescription

beforeEach('Open filter page', () => {
  loginPage.login()
  filterPage.openViaSideBar()
  filterPage.getFilterRows()
  randomFilterName = `${getRandomString()} test filter`
  randomFilterDescription = `${getRandomString()} test description`
})

afterEach('Logout', () => {
  loginPage.logout()
})

describe('Filters page - part 1', () => {
  it('Add a new filter', () => {
    filterPage.clickAddFilter()
    cy.url().should('contain', launchesPage.url)
    launchesPage.fillFacet('Launch name', ['Contains', 'Demo'])
    launchesPage.checkFacet('Launch name', ['Contains', 'Demo'])
    launchesPage.addFacet('Attribute')
    launchesPage.fillFacet('Attribute', ['Any', 'platform', 'linux', 'build', '3.11.18.45.5'])
    launchesPage.checkFacet('Attribute', ['Any', 'platform', 'linux', 'build', '3.11.18.45.5'])
    launchesPage.addFacet('Owner')
    launchesPage.fillFacet('Owner', ['superadmin'])
    launchesPage.checkFacet('Owner', ['superadmin'])
    launchesPage.saveFilter(randomFilterName, randomFilterDescription)
    launchesPage.goToFiltersPage()
    cy.url().should('contain', filterPage.url)
    filterPage.checkFilterRow(randomFilterName, randomFilterDescription)
  })

  it('Delete a filter', () => {
    filterPage.getFilterRow().then(row => {
      const filterText = row.text()
      filterPage.deleteFilter()
      filterPage.checkFilterAbsent(filterText)
    })
  })
})
