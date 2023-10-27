import { expect } from 'chai'
import { getRandomString } from '../cypress/support/helpers'
import { getAllFilters, createFilter, deleteFilter } from './api'

describe('Filters page (API tests)', () => {
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
    const filters = await getAllFilters()
    console.log('1')
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
    console.log('2')
    const body = await createFilter(newFilterData.conditions, newFilterData.name, newFilterData.description, newFilterData.sortingColumn, newFilterData.isAscending)
    expect(body).to.have.property('id')
  })

  it('Delete a filter', async () => {
    console.log('3')
    const filters = await getAllFilters()
    const id = filters[0].id
    const body = await deleteFilter(id)
    expect(body.message).to.equal(`User filter with ID = '${id}' successfully deleted.`)
  })
})
