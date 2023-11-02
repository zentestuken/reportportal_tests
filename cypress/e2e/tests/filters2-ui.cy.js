import FilterPage from '../../po/filter.page.js'
import LoginPage from '../../po/login.page.js'
import LaunchesPage from '../../po/launches.page.js'
import { getRandomString } from '../../support/helpers.js'

const filterPage = new FilterPage()
const loginPage = new LoginPage()
const launchesPage = new LaunchesPage()
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

describe('Filters page - part 2', () => {
  it('Edit a filter', () => {
    filterPage.getFilterRow().then(row => {
      const filterText = row.text()
      filterPage.openFilter()
      cy.url().should('contain', launchesPage.url)
      launchesPage.editOpenedFilterData(randomFilterName, randomFilterDescription)
      launchesPage.goToFiltersPage()
      cy.url().should('contain', filterPage.url)
      filterPage.checkFilterRow(randomFilterName, randomFilterDescription)
      filterPage.checkFilterAbsent(filterText)
    })
  })

  it('Clone a filter', () => {
    filterPage.getFilterName().then(name => {
      const filterName = name.text()
      filterPage.openFilter()
      cy.url().should('contain', launchesPage.url)
      launchesPage.cloneOpenedFilter(randomFilterName, randomFilterDescription)
      launchesPage.goToFiltersPage()
      cy.url().should('contain', filterPage.url)
      filterPage.checkFilterRow(randomFilterName, randomFilterDescription)
      filterPage.checkFilterRow(filterName)
    })
  })
})
