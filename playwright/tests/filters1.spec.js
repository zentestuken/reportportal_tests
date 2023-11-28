import { test, expect } from '@playwright/test'
import FilterPage from '../po/filter.page.js'
import LoginPage from '../po/login.page.js'
import LaunchesPage from '../po/launches.page.js'
import { getRandomString, awaitResponse } from '../support/helpers.js'

let randomFilterName
let randomFilterDescription
let filterPage, loginPage, launchesPage

test.beforeEach('Login and open filters page', async ({ page }) => {
  filterPage = new FilterPage(page)
  loginPage = new LoginPage(page)
  launchesPage = new LaunchesPage(page)
  randomFilterName = `${getRandomString()} test filter`
  randomFilterDescription = `${getRandomString()} test description`

  await loginPage.login()
  await filterPage.openViaSideBar()
})

test.afterEach('Logout', async ({ page }) => {
  await loginPage.logout()
})

test.describe('Filters page - part 1', () => {
  test('Add a new filter', async ({ page }) => {
    await page.waitForTimeout(2000)
    await filterPage.clickAddFilter()
    await expect(page).toHaveURL(new RegExp(launchesPage.url))
    await launchesPage.fillFacet('Launch name', ['Contains', 'Demo'])
    await launchesPage.checkFacet('Launch name', ['Contains', 'Demo'])
    await launchesPage.addFacet('Attribute')
    await launchesPage.fillFacet('Attribute', ['Any', 'platform', 'linux', 'build', '3.11.18.45.5'])
    await launchesPage.checkFacet('Attribute', ['Any', 'platform', 'linux', 'build', '3.11.18.45.5'])
    await launchesPage.addFacet('Owner')
    await launchesPage.fillFacet('Owner', ['superadmin'])
    await launchesPage.checkFacet('Owner', ['superadmin'])
    await launchesPage.saveFilter(randomFilterName, randomFilterDescription)
    await launchesPage.goToFiltersPage()
    await expect(page).toHaveURL(new RegExp(filterPage.url))
    await filterPage.checkFilterRow(randomFilterName, randomFilterDescription)
  })

  test('Delete a filter', async ({ page }) => {
    const row = await filterPage.getFilterRow(3)
    const filterText = await row.textContent()
    await filterPage.deleteFilter(3)
    await filterPage.checkFilterAbsent(filterText)
  })

  test('Disable displaying the filter on "Launches" page', async ({ page }) => {
    const turnedOnRow = await filterPage.getFilterWithDisplayOn()
    const row = await turnedOnRow.row
    const rowName = await turnedOnRow.name
    await filterPage.switchDisplayOnLaunches(row)
    await launchesPage.openViaSideBar()
    await expect(page).toHaveURL(new RegExp(launchesPage.url))
    await launchesPage.checkFilterDisplayed(rowName, false)
  })

  test('Enable displaying the filter on "Launches" page', async ({ page }) => {
    const turnedOffRow = await filterPage.getFilterWithDisplayOff()
    const row = await turnedOffRow.row
    const rowName = await turnedOffRow.name
    await filterPage.switchDisplayOnLaunches(row)
    await launchesPage.openViaSideBar()
    await expect(page).toHaveURL(new RegExp(launchesPage.url))
    await launchesPage.checkFilterDisplayed(rowName)
  })

  test('Correct response to GET /filter when opening "Filters" page', async ({ page }) => {
    const filtersResponsePromise = awaitResponse('filter', page)
    await launchesPage.openViaSideBar()
    await filterPage.openViaSideBar()
    const filtersResponse = await filtersResponsePromise
    const filtersData = await filtersResponse.json()
    await expect(filtersResponse.status()).toEqual(200)
    expect(filtersData.content.length).toBeGreaterThanOrEqual(1)
    filtersData.content.forEach(filter => {
      expect(filter).toHaveProperty('owner')
      expect(filter).toHaveProperty('id')
      expect(filter).toHaveProperty('name')
      expect(filter).toHaveProperty('conditions')
      expect(filter).toHaveProperty('orders')
      expect(filter).toHaveProperty('type')
    })
  })
})
