import { createFilter, getAllFilters, updateFilter, updateFilterById } from '../../support/api'
import { getRandomString } from '../../support/helpers.js'

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

  it('Update filter', () => {
    getAllFilters().then(filters => {
      const id = filters[0].id
      updateFilter(id, updatedFilterData.conditions, updatedFilterData.name, updatedFilterData.description, updatedFilterData.sortingColumn, updatedFilterData.isAscending).then(body => {
        expect(body).to.have.property('message')
      })
    })
  })

  it('Update filter by ID', () => {
    getAllFilters().then(filters => {
      const id = filters[1].id
      updateFilterById(id, updatedFilterData.conditions, updatedFilterData.name, updatedFilterData.description, updatedFilterData.sortingColumn, updatedFilterData.isAscending).then(body => {
        expect(body.message).to.equal(`User filter with ID = '${id}' successfully updated.`)
      })
    })
  })
})
