import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import page from '../../po/index'
import { getRandomString } from '../../support/helpers.js'

const filterPage = page('Filters')
const launchesPage = page('Launches')
// eslint-disable-next-line no-unused-vars, one-var
let randomFilterName, randomFilterDescription = ''
// eslint-disable-next-line no-unused-vars
let originalFilterName = ''

Given('random name, description were generated', () => {
  randomFilterName = `${getRandomString()} test filter`
  randomFilterDescription = `${getRandomString()} test description`
})

When('I open existing filter', () => {
  filterPage.getFilterName().then(name => {
    originalFilterName = name.text()
    filterPage.openFilter()
  })
})

When('I update opened filter with random name and description', () => {
  launchesPage.editOpenedFilterData(randomFilterName, randomFilterDescription)
})

Then('filter row with updated data is shown', () => {
  filterPage.checkFilterRow(randomFilterName, randomFilterDescription)
})

Then(/^filter row with original data is (not )?shown$/, (absent) => {
  if (absent) filterPage.checkFilterAbsent(originalFilterName)
  else filterPage.checkFilterRow(originalFilterName)
})

When('I clone opened filter and update random name and description', () => {
  launchesPage.cloneOpenedFilter(randomFilterName, randomFilterDescription)
})
