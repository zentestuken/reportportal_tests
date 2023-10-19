const baseUrl = Cypress.config().apiBaseUrl

export const getAllFilters = () => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}filter`,
    headers: { Authorization: `Bearer ${Cypress.config('apiToken')}` }
  }).as('response')
  return cy.get('@response').then(res => res.body.content)
}

export const createFilter = (conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  cy.request({
    method: 'POST',
    url: `${baseUrl}filter`,
    headers: { Authorization: `Bearer ${Cypress.config('apiToken')}` },
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
    headers: { Authorization: `Bearer ${Cypress.config('apiToken')}` },
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
    headers: { Authorization: `Bearer ${Cypress.config('apiToken')}` },
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

export const deleteFilter = id => {
  cy.request({
    method: 'DELETE',
    url: `${baseUrl}filter/${id}`,
    headers: { Authorization: `Bearer ${Cypress.config('apiToken')}` }
  }).as('response')
  return cy.get('@response').then(res => res.body)
}
