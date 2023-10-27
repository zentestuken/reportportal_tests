import { axios, apiBaseUrl, apiToken } from './config.js'

export const getAllFilters = async () => {
  const res = await axios({
    method: 'GET',
    url: `${apiBaseUrl}filter`,
    headers: { Authorization: `Bearer ${apiToken}` }
  })
  return res.data.content
}

export const createFilter = async (conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  const res = await axios({
    method: 'POST',
    url: `${apiBaseUrl}filter`,
    headers: { Authorization: `Bearer ${apiToken}` },
    data: {
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
  })
  return res.data
}

export const updateFilter = async (id, conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${apiBaseUrl}filter`,
      headers: { Authorization: `Bearer ${apiToken}` },
      data: {
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
    })
    return res.data
  } catch (err) {
    console.log(err.message)
  }
}

export const updateFilterById = async (id, conditions, name, description = '', sortingColumn = 'startTime', isAscending = false) => {
  const res = await axios({
    method: 'PUT',
    url: `${apiBaseUrl}filter/${id}`,
    headers: { Authorization: `Bearer ${apiToken}` },
    data: {
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
  })
  return res.data
}

export const deleteFilter = async id => {
  const res = await axios({
    method: 'DELETE',
    url: `${apiBaseUrl}filter/${id}`,
    headers: { Authorization: `Bearer ${apiToken}` }
  })
  return res.data
}
