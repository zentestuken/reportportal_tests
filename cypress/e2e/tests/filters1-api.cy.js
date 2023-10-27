import { getRandomString } from '../../support/helpers'
import { getAllFilters, createFilter, deleteFilter } from '../../support/api.js'

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

  it('Get all filters', () => {
    getAllFilters().then(filters => {
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
  })

  it('Create new filter', () => {
    createFilter(newFilterData.conditions, newFilterData.name, newFilterData.description, newFilterData.sortingColumn, newFilterData.isAscending).then(body => {
      expect(body).to.have.property('id')
    })
  })

  it('Delete a filter', () => {
    getAllFilters().then(filters => {
      const id = filters[0].id
      return deleteFilter(id).then(body => {
        expect(body.message).to.equal(`User filter with ID = '${id}' successfully deleted.`)
      })
    })
  })
})
