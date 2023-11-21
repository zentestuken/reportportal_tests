import { AddFilterBtn, SideBar } from './common.component.js'
import { expect } from '@playwright/test'

class FilterPage {
  constructor (page) {
    this.url = '/filters'
    this.page = page
  }

  open () {
    return this.page.goto(this.url)
  }

  openViaSideBar () {
    const sideBar = new SideBar(this.page)
    return sideBar.filtersBtn().click()
  }

  goToLaunchesPage () {
    const sideBar = new SideBar(this.page)
    return sideBar.launchesBtn().click()
  }

  clickAddFilter () {
    const addFilterBtn = new AddFilterBtn(this.page)
    return addFilterBtn().click()
  }

  getFilterRows () {
    return this.page.locator('div[class^="gridRow__grid-row--"]')
  }

  getFilterRow (rowIndex = 0) {
    return this.getFilterRows().nth(rowIndex)
  }

  getFilterName (rowIndex = 0) {
    return this.getFilterRow(rowIndex).locator('span[class*="filterName__link-"]')
  }

  deleteFilter (rowIndex = 0) {
    return this.getFilterRow(rowIndex).then(row => {
      row.locator('div[class^="deleteFilterButton"]').click()
      this.page.locator('div[class^=modalFooter] button').filter({ hasText: 'Delete' }).click()
    })
  }

  checkFilterAbsent (name) {
    return expect(this.getFilterRows()).not.toContainText(name)
  }

  async checkFilterRow (name, description) {
    await expect(this.getFilterRows()).toContainText(name)
    if (description) await expect(this.getFilterRows()).toContainText(description)
  }

  openFilter (rowIndex = 0) {
    return this.getFilterRow(rowIndex).locator('a[class^="filterName__name-link-"]').click()
  }
}

export default FilterPage
