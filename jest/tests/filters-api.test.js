import { expect } from 'chai'
import { getRandomString } from '../../cypress/support/helpers'
import { getAllFilters, createFilter, deleteFilter } from '../support/api'

describe('Filters page (API tests) - part 1', () => {
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

  it('Get all filters', async () => {
    const response = await getAllFilters()
    const filters = response.body.content
    // eslint-disable-next-line no-unused-expressions
    expect(filters).not.to.be.empty
    filters.forEach(filter => {
      expect(filter).to.have.property('owner')
      expect(filter).to.have.property('id')
      expect(filter).to.have.property('name')
      expect(filter).to.have.property('conditions')
      expect(filter).to.have.property('orders')
      expect(filter).to.have.property('type')
    })
  })

  it('Create new filter', async () => {
    const response = await createFilter(newFilterData.conditions, newFilterData.name, newFilterData.description, newFilterData.sortingColumn, newFilterData.isAscending)
    expect(response.body).to.have.property('id')
  })

  it('Delete a filter', async () => {
    const alFiltersResponse = await getAllFilters()
    const id = alFiltersResponse.body.content[0].id
    const response = await deleteFilter(id)
    expect(response.body.message).to.equal(`User filter with ID = '${id}' successfully deleted.`)
  })
})
