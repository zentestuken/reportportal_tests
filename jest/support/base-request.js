import { request } from '@playwright/test'
import { apiBaseUrl, apiToken } from './config'
import axios from 'axios'

export const APIRequestPlaywright = async (path, method = 'GET', body = {}) => {
  const contextRequest = await request.newContext({ baseURL: apiBaseUrl, extraHTTPHeaders: { Authorization: `Bearer ${apiToken}` } })
  const responseData = await contextRequest[method.toLowerCase()](path, { data: body }).catch(error => {
    return {
      status: () => 'N/A',
      body: () => 'N/A',
      error: error.message
    }
  })
  const response = {
    status: await responseData.status(),
    body: await responseData.json(),
    error: (typeof responseData.error === 'undefined') ? 'No errors' : await responseData.error
  }
  if (await responseData.status() > 299 && typeof responseData.error === 'undefined') response.error = response.body
  console.log(`API request (Playwright):
  path: ${path}
  method: ${method}
  body: ${JSON.stringify(body)}
  --> Response status: ${response.status}
  --> Errors: ${JSON.stringify(response.error)}`)
  return response
}

export const APIRequestAxios = async (path, method = 'GET', body = {}) => {
  const responseData = await axios({
    method,
    url: `${apiBaseUrl}${path}`,
    headers: { Authorization: `Bearer ${apiToken}` },
    data: body
  }).catch(error => {
    return {
      status: error.response.status,
      body: error.response.data,
      error: error.response.data
    }
  })
  const response = {
    status: responseData.status,
    body: responseData.data,
    error: (typeof responseData.error === 'undefined') ? 'No errors' : await responseData.error
  }
  if (responseData.status > 299 && typeof responseData.error === 'undefined') response.error = response.body
  console.log(`API request (Axios):
  path: ${path}
  method: ${method}
  body: ${JSON.stringify(body)}
  --> Response status: ${response.status}
  --> Errors: ${JSON.stringify(response.error)}`)
  return response
}
