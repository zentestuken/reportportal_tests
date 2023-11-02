import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import page from '../../po/index'
import { getRandomString } from '../../support/helpers.js'

const filterPage = page('Filters')
const launchesPage = page('Launches')
// eslint-disable-next-line no-unused-vars, one-var
let randomFilterName, randomFilterDescription = ''
// eslint-disable-next-line no-unused-vars
let deletedFilterText = ''

Given('random name, description were generated', () => {
  randomFilterName = `${getRandomString()} test filter`
  randomFilterDescription = `${getRandomString()} test description`
})

When('I click `Add Filter` button', () => {
  filterPage.clickAddFilter()
})

When('I fill facet {string} with values {string}', (facetName, valuesString) => {
  const values = valuesString.split(', ')
  launchesPage.fillFacet(facetName, values)
})

Then('facet {string} has values {string}', (facetName, valuesString) => {
  const values = valuesString.split(', ')
  launchesPage.checkFacet(facetName, values)
})

Then('I add facet {string}', (facetName) => {
  launchesPage.addFacet(facetName)
})

When('I save a filter using name random name and description', () => {
  launchesPage.saveFilter(randomFilterName, randomFilterDescription)
})

Then('filter row with created filter is shown', () => {
  filterPage.checkFilterRow(randomFilterName, randomFilterDescription)
})

When('I delete existing filter', () => {
  filterPage.getFilterRow().then(row => {
    deletedFilterText = row.text()
    filterPage.deleteFilter()
  })
})

Then('filter row with deleted filter is not shown', () => {
  filterPage.checkFilterAbsent(deletedFilterText)
})
