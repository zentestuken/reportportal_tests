import { expect } from 'chai'
import { getRandomString } from '../../cypress/support/helpers'
import { getAllFilters, createFilter, deleteFilter, getFilterById, updateFilterById } from '../support/api'

describe('Filters page (API tests) - negative tests', () => {
  const newFilterData = {
    name: `${getRandomString()} New filter via API`,
    description: `${getRandomString()} Created via API ${getRandomString()}`,
    sortingColumn: 'number',
    isAscending: true,
    conditions: [
      {
        filteringField: 'name',
        condition: 'cnt',
        value: 'Api'
      },
      {
        filteringField: 'compositeAttribute',
        condition: '!any',
        value: 'platform:linux,platform:mint'
      },
      {
        filteringField: 'user',
        condition: 'in',
        value: 'superadmin'
      }
    ]
  }
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

  it('Cannot create new filter without parameters', async () => {
    const response = await createFilter('', '', '')
    expect(response.error.message).to.contain('Incorrect Request. JSON parse error')
  })

  it('Cannot create new filter with the same name as existing', async () => {
    const allfiltersResponse = await getAllFilters()
    const existingName = allfiltersResponse.body.content[0].name
    const response = await createFilter(newFilterData.conditions, existingName)
    expect(response.error.message).to.contain(`User filter with name '${existingName}' already exists for user`)
  })

  it('Cannot get filter by non-existent ID', async () => {
    const response = await getFilterById('ABC1')
    expect(response.status).to.equal(400)
    expect(response.error.error).to.contain('Bad Request')
  })

  it('Cannot update a filter by non-existent ID', async () => {
    const response = await updateFilterById('ABC1', updatedFilterData.conditions, updatedFilterData.name, updatedFilterData.description, updatedFilterData.sortingColumn, updatedFilterData.isAscending)
    expect(response.status).to.equal(400)
    expect(response.error.error).to.equal('Bad Request')
  })

  it('Cannot update a filter without specifying ID', async () => {
    const response = await updateFilterById('', updatedFilterData.conditions, updatedFilterData.name, updatedFilterData.description, updatedFilterData.sortingColumn, updatedFilterData.isAscending)
    expect(response.error.message).to.contain('Incorrect Request.')
  })

  it('Cannot delete a filter with non-existent ID', async () => {
    const response = await deleteFilter('012xyz')
    expect(response.status).to.equal(400)
    expect(response.error.error).to.equal('Bad Request')
  })
})
