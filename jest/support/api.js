import { APIRequestPlaywright, APIRequestAxios } from './base-request'

const switchClients = () => {
  if (typeof process.env.APICLIENT === 'undefined') return APIRequestPlaywright
  switch (process.env.APICLIENT.toLowerCase()) {
    case 'axios':
      return APIRequestAxios
    case 'playwright':
      return APIRequestPlaywright
    default:
      throw Error(`"${process.env.APICLIENT}" API client specified in "APICLIENT" environment variable is not configured`)
  }
}
const APIRequest = switchClients()

export const getAllFilters = async () => {
  return APIRequest('filter')
}

export const getFilterById = async (id) => {
  return APIRequest(`filter/${id}`)
}

export const createFilter = async (conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  return APIRequest('filter', 'POST',
    {
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
    })
}

export const updateFilter = async (id, conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  return APIRequest('filter', 'PUT',
    {
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
    })
}

export const updateFilterById = async (id, conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  return APIRequest(`filter/${id}`, 'PUT',
    {
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
    })
}

export const deleteFilter = async id => {
  return APIRequest(`filter/${id}`, 'DELETE')
}
