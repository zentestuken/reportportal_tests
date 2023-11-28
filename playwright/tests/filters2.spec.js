import { test, expect } from '@playwright/test'
import FilterPage from '../po/filter.page.js'
import LoginPage from '../po/login.page.js'
import LaunchesPage from '../po/launches.page.js'
import { getRandomString, highlightClick, scrollIntoView, mockResponseData } from '../support/helpers.js'

const emptyFiltersJson = { content: [] }
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

test.describe('Filters page - part 2', () => {
  test('Edit a filter', async ({ page }) => {
    const row = await filterPage.getFilterRow(1)
    const filterText = await row.textContent()
    await filterPage.openFilter(1)
    await expect(page).toHaveURL(new RegExp(launchesPage.url))
    await launchesPage.editOpenedFilterData(randomFilterName, randomFilterDescription)
    await launchesPage.goToFiltersPage()
    await expect(page).toHaveURL(new RegExp(filterPage.url))
    await filterPage.checkFilterRow(randomFilterName, randomFilterDescription)
    await filterPage.checkFilterAbsent(filterText)
  })

  test('Clone a filter', async ({ page }) => {
    const filterName = await filterPage.getFilterName(2).textContent()
    await filterPage.openFilter(2)
    await expect(page).toHaveURL(new RegExp(launchesPage.url))
    await launchesPage.cloneOpenedFilter(randomFilterName, randomFilterDescription)
    await launchesPage.goToFiltersPage()
    await expect(page).toHaveURL(new RegExp(filterPage.url))
    await filterPage.checkFilterRow(randomFilterName, randomFilterDescription)
    await filterPage.checkFilterRow(filterName)
  })

  test('Scroll page control into view and check', async ({ page }) => {
    const pageControl = await filterPage.getPageControl()
    await scrollIntoView(pageControl, page)
    await expect(pageControl).toBeInViewport()
  })

  test('Custom-click page control and check input', async ({ page }) => {
    const pageControl = await filterPage.getPageControl()
    await scrollIntoView(pageControl, page)
    await highlightClick(pageControl, page)
    await expect(await filterPage.getPageControlInput()).toBeVisible()
  })

  test('Mock response from /filter when opening "Filters" page, and verify', async ({ page }) => {
    await mockResponseData('filter', emptyFiltersJson, page)
    await launchesPage.openViaSideBar()
    await filterPage.openViaSideBar()
    await expect(filterPage.noFiltersMessage).toHaveText('There are no filters')
  })
})
