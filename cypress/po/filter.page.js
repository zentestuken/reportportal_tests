import { addFilterBtn, sideBar } from './common.component.js'

class FilterPage {
  constructor () {
    this.url = '/filters'
  }

  open () {
    return cy.visit(this.url)
  }

  openViaSideBar () {
    return sideBar.filtersBtn().click()
  }

  goToLaunchesPage () {
    return sideBar.launchesBtn().click()
  }

  clickAddFilter () {
    return addFilterBtn().click()
  }

  getFilterRows () {
    return cy.get('div[class^="gridRow__grid-row--"]')
  }

  getFilterRow (rowIndex = 0) {
    return this.getFilterRows().eq(rowIndex)
  }

  getFilterName (rowIndex) {
    return this.getFilterRow(rowIndex).find('span[class*="filterName__link-"]')
  }

  deleteFilter (rowIndex = 0) {
    return this.getFilterRow(rowIndex).then(row => {
      row.find('div[class^="deleteFilterButton"]').click()
      cy.get('div[class^=modalFooter] button').contains('Delete').click()
    })
  }

  checkFilterAbsent (name) {
    this.getFilterRows().should('not.contain', name)
  }

  checkFilterRow (name, description) {
    this.getFilterRows().contains(name)
    if (description) this.getFilterRows().contains(description)
  }

  openFilter (rowIndex = 0) {
    this.getFilterRow(rowIndex).find('a[class^="filterName__name-link-"]').click()
  }
}

export default FilterPage
