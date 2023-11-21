import { test, expect } from '@playwright/test'
import FilterPage from '../po/filter.page.js'
import LoginPage from '../po/login.page.js'
import LaunchesPage from '../po/launches.page.js'
import { getRandomString } from '../support/helpers.js'

let randomFilterName
let randomFilterDescription
let filterPage, loginPage, launchesPage

test.beforeEach('Login', async ({ page }) => {
  filterPage = new FilterPage(page)
  loginPage = new LoginPage(page)
  launchesPage = new LaunchesPage(page)
  randomFilterName = `${getRandomString()} test filter`
  randomFilterDescription = `${getRandomString()} test description`

  await loginPage.login()
  await filterPage.openViaSideBar()
})

test.afterEach('Logout', async ({ page }) => {
  // const loginPage = new LoginPage(page)
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
})
