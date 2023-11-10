/* eslint-disable no-unused-vars */
import { expect } from 'chai'
import { getRandomString } from '../../cypress/support/helpers'
import { getAllFilters, updateFilter, updateFilterById, getFilterById } from '../support/api'

describe('Filters page (API tests) - part 2', () => {
  const updatedFilterData = {
    name: `${getRandomString()} updated filter via API`,
    description: `${getRandomString()} Updated via API ${getRandomString()}`,
    sortingColumn: 'number',
    isAscending: false,
    conditions: [
      {
        filteringField: 'name',
        condition: 'cnt',
        value: 'Tests'
      },
      {
        filteringField: 'compositeAttribute',
        condition: '!any',
        value: 'platform:windows'
      }
    ]
  }

  it('Update a filter', async () => {
    const allFiltersResponse = await getAllFilters()
    const id = allFiltersResponse.body.content[0].id
    const response = await updateFilter(id, updatedFilterData.conditions, updatedFilterData.name, updatedFilterData.description, updatedFilterData.sortingColumn, updatedFilterData.isAscending)
    expect(response.status).to.equal(204)
    expect(response.body.message).to.equal(`User filter with ID = '${id}' successfully updated.`)
  })

  it('Update a filter by ID', async () => {
    const allFiltersResponse = await getAllFilters()
    const id = allFiltersResponse.body.content[1].id
    const response = await updateFilterById(id, updatedFilterData.conditions, updatedFilterData.name, updatedFilterData.description, updatedFilterData.sortingColumn, updatedFilterData.isAscending)
    expect(response.body.message).to.equal(`User filter with ID = '${id}' successfully updated.`)
  })

  it('Get filter by ID', async () => {
    const allFiltersResponse = await getAllFilters()
    const id = allFiltersResponse.body.content[2].id
    const response = await getFilterById(id)
    expect(response.body.id).to.equal(id)
  })
})
