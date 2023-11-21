import { SideBar } from './common.component.js'
import FilterFacet from './filterFacet.component.js'
import { expect } from '@playwright/test'

const regularFacetNames = ['Launch name']
const simpleFacetNames = ['Owner']
const keyValueFacetNames = ['Attribute']

class LaunchesPage {
  constructor (page) {
    this.url = '/launches'
    this.page = page
  }

  open () {
    return this.page.goto(this.url)
  }

  openViaSideBar () {
    const sideBar = new SideBar()
    return sideBar.launchesBtn().click()
  }

  goToFiltersPage () {
    const sideBar = new SideBar()
    return sideBar.filtersBtn().click()
  }

  async fillFacet (name, values) {
    const facet = new FilterFacet(name, this.page)
    if (regularFacetNames.includes(name)) {
      await facet.select().click()
      await facet.option(values[0]).click()
      await facet.input().fill(values[1])
    }
    if (simpleFacetNames.includes(name)) {
      await facet.input().fill(values[0])
      await facet.autoCompleteOption(values[0]).click()
    }
    if (keyValueFacetNames.includes(name)) {
      await facet.select().click()
      await facet.option(values[0]).click()
      await facet.keyInput().fill(values[1])
      await facet.autoCompleteOption(values[1]).click()
      await facet.valueInput().fill(values[2])
      await facet.autoCompleteOption(values[2]).click()
      await facet.keyValueConfirmBtn().click()
    }
  }

  async checkFacet (name, values) {
    const facet = new FilterFacet(name, this.page)
    if (regularFacetNames.includes(name)) {
      await expect(facet.selectedOption()).toHaveText(values[0])
      await expect(facet.input()).toHaveValue(values[1])
    }
    if (simpleFacetNames.includes(name)) {
      await expect(facet.simpleInputAdded()).toHaveText(values[0])
    }
    if (keyValueFacetNames.includes(name)) {
      await expect(facet.selectedOption()).toHaveText(values[0])
      await expect(facet.keyAdded()).toHaveText(values[1])
      await expect(facet.valueAdded()).toHaveText(values[2])
    }
  }

  async addFacet (name) {
    await this.page.locator('div[class^="entitiesSelector"]').filter({ hasText: /^More$/ }).click()
    await this.page.locator('div[class*="__entity-item-"]').filter({ hasText: new RegExp(`^${name}$`) }).click()
  }

  async saveFilter (filterName, filterDescription) {
    await this.page.locator('button[title="Save"]').click()
    await this.page.locator('input[placeholder="Enter filter name"]').click()
    await this.page.keyboard.press('Control+A')
    await this.page.locator('input[placeholder="Enter filter name"]').fill(filterName)
    await this.page.locator('pre[role="presentation"]').click()
    await this.page.keyboard.press('Control+A')
    await this.page.locator('pre[role="presentation"]').fill(filterDescription)
    await this.page.locator('div[class^=modalFooter] button').filter({ hasText: 'Add' }).click()
  }

  async editOpenedFilterData (updatedName, updatedDescription) {
    await this.page.locator('button[title="Edit"]').click()
    await this.page.locator('input[placeholder="Enter filter name"]').click()
    await this.page.keyboard.press('Control+A')
    await this.page.locator('input[placeholder="Enter filter name"]').fill(updatedName)
    await this.page.locator('pre[role="presentation"]').click()
    await this.page.keyboard.press('Control+A')
    await this.page.locator('pre[role="presentation"]').fill(updatedDescription)
    await this.page.locator('div[class^=modalFooter] button').filter({ hasText: 'Update' }).click()
  }

  async cloneOpenedFilter (updatedName, updatedDescription) {
    await this.page.locator('button[title="Clone"]').click()
    await this.page.locator('button[title="Save"]').click()
    await this.page.locator('input[placeholder="Enter filter name"]').click()
    await this.page.keyboard.press('Control+A')
    await this.page.locator('input[placeholder="Enter filter name"]').fill(updatedName)
    await this.page.locator('pre[role="presentation"]').click()
    await this.page.keyboard.press('Control+A')
    await this.page.locator('pre[role="presentation"]').fill(updatedDescription)
    await this.page.locator('div[class^=modalFooter] button').filter({ hasText: 'Add' }).click()
  }
}

export default LaunchesPage
