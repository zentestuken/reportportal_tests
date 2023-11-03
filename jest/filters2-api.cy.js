/* eslint-disable no-unused-vars */
import { expect } from 'chai'
import { getRandomString } from '../cypress/support/helpers'
import { getAllFilters, updateFilter, updateFilterById } from './api'

describe('Filters page (API tests)', () => {
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
    const filters = await getAllFilters()
    const id = filters[0].id
    const body = await updateFilter(id, updatedFilterData.conditions, updatedFilterData.name, updatedFilterData.description, updatedFilterData.sortingColumn, updatedFilterData.isAscending)
    expect(body).to.have.property('message')
  })

  it('Update a filter by ID', async () => {
    const filters = await getAllFilters()
    const id = filters[1].id
    const body = await updateFilterById(id, updatedFilterData.conditions, updatedFilterData.name, updatedFilterData.description, updatedFilterData.sortingColumn, updatedFilterData.isAscending)
    expect(body.message).to.equal(`User filter with ID = '${id}' successfully updated.`)
  })
})
