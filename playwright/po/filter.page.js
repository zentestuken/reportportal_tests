import { AddFilterBtn, SideBar } from './common.component.js'
import { expect } from '@playwright/test'

class FilterPage {
  constructor (page) {
    this.url = '/filters'
    this.page = page
    this.noFiltersMessage = this.page.locator('div[class^="noFiltersBlock__title-"]')
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

  async deleteFilter (rowIndex = 0) {
    const row = await this.getFilterRow(rowIndex)
    await row.locator('div[class^="deleteFilterButton"]').click()
    await this.page.locator('div[class^=modalFooter] button').filter({ hasText: 'Delete' }).click()
  }

  checkFilterAbsent (name) {
    return expect(this.getFilterRows().filter({ hasText: name })).toHaveCount(0)
  }

  async checkFilterRow (name, description) {
    await expect(this.getFilterRows().filter({ hasText: name }).first()).toBeVisible()
    if (description) await expect(this.getFilterRows().filter({ hasText: description }).first()).toBeVisible()
  }

  openFilter (rowIndex = 0) {
    return this.getFilterRow(rowIndex).locator('a[class^="filterName__name-link-"]').click()
  }

  async getFilterWithDisplayOn () {
    const row = await this.getFilterRows().filter({ has: this.page.locator('span[class*="inputSwitcher__on"]') }).last()
    return {
      row,
      name: await row.locator('a[class^="filterName__name-link-"]').textContent()
    }
  }

  async getFilterWithDisplayOff () {
    const row = await this.getFilterRows().filter({ hasNot: this.page.locator('span[class*="inputSwitcher__on"]') }).last()
    return {
      row,
      name: await row.locator('a[class^="filterName__name-link-"]').textContent()
    }
  }

  switchDisplayOnLaunches (rowElement) {
    return rowElement.locator('span[class^="displayFilter__switcher-label"]').click()
  }

  getPageControl () {
    return this.page.locator('span[class^="pageSizeControl__size-text"]')
  }

  getPageControlInput () {
    return this.page.locator('div[class^="pageSizeControl__size-input"] input')
  }
}

export default FilterPage
