import { apiToken } from '../../environment/constants'

const baseUrl = Cypress.config().apiBaseUrl

export const getAllFilters = () => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}filter`,
    headers: { Authorization: `Bearer ${apiToken}` }
  }).as('response')
  return cy.get('@response').then(res => res.body.content)
}

export const createFilter = (conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  cy.request({
    method: 'POST',
    url: `${baseUrl}filter`,
    headers: { Authorization: `Bearer ${apiToken}` },
    body: {
      conditions,
      description,
      name,
      orders: [
        {
          isAsc: isAscending,
          sortingColumn
        }
      ],
      type: 'launch'
    }
  }).as('response')
  return cy.get('@response').then(res => res.body)
}

export const updateFilter = (id, conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  cy.request({
    method: 'PUT',
    url: `${baseUrl}filter`,
    headers: { Authorization: `Bearer ${apiToken}` },
    body: {
      elements: [{
        conditions,
        description,
        name,
        id,
        orders: [
          {
            isAsc: isAscending,
            sortingColumn
          }
        ],
        type: 'launch'
      }]
    }
  }).as('response')
  return cy.get('@response').then(res => res.body)
}

export const updateFilterById = (id, conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  cy.request({
    method: 'PUT',
    url: `${baseUrl}filter/${id}`,
    headers: { Authorization: `Bearer ${apiToken}` },
    body: {
      conditions,
      description,
      name,
      id,
      orders: [
        {
          isAsc: isAscending,
          sortingColumn
        }
      ],
      type: 'launch'
    }
  }).as('response')
  return cy.get('@response').then(res => res.body)
}
