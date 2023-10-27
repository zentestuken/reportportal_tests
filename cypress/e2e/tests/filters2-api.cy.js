import { getRandomString } from '../../support/helpers'
import { getAllFilters, updateFilter, updateFilterById } from '../../support/api.js'

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

  it('Update a filter', () => {
    getAllFilters().then(filters => {
      const id = filters[0].id
      return updateFilter(id, updatedFilterData.conditions, updatedFilterData.name, updatedFilterData.description, updatedFilterData.sortingColumn, updatedFilterData.isAscending).then(body => {
        expect(body).to.have.property('message')
      })
    })
  })

  it('Update a filter by ID', () => {
    getAllFilters().then(filters => {
      const id = filters[1].id
      return updateFilterById(id, updatedFilterData.conditions, updatedFilterData.name, updatedFilterData.description, updatedFilterData.sortingColumn, updatedFilterData.isAscending).then(body => {
        expect(body.message).to.equal(`User filter with ID = '${id}' successfully updated.`)
      })
    })
  })
})
