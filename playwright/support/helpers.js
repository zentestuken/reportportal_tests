import 'dotenv/config'
import { envData, envDataLocal } from '../../environment/constants.js'

const environment = process.env.ENV === 'local' ? envDataLocal : envData
const apiBasePath = `/api/v1/${environment.projectName}/`

export const getRandomString = (length = 14) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export const scrollIntoView = async (element, page) => {
  const selector = element._selector
  await element.waitFor({ state: 'visible' })
  await page.evaluate((sel) => document.querySelector(sel).scrollIntoView(), selector)
}

export const highlightClick = async (element, page) => {
  const selector = element._selector
  await element.waitFor({ state: 'visible' })
  async function highlightThis (loc) {
    function sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
    const origBackground = await document.querySelector(loc).style.backgroundColor
    const origBorderStyle = await document.querySelector(loc).style.borderStyle
    const origBorderColor = await document.querySelector(loc).style.borderColor
    document.querySelector(loc).style.backgroundColor = 'yellow'
    document.querySelector(loc).style.borderStyle = 'solid'
    document.querySelector(loc).style.borderColor = 'red'
    await sleep(1000)
    document.querySelector(loc).style.backgroundColor = origBackground
    document.querySelector(loc).style.borderStyle = origBorderStyle
    document.querySelector(loc).style.borderColor = origBorderColor
  }
  await page.evaluate(highlightThis, selector)
  await page.evaluate((sel) => document.querySelector(sel).click(), selector)
}

export const awaitResponse = async (url, page) => {
  return page.waitForResponse(response => response.url().includes(`${apiBasePath}${url}`))
}

export const mockResponseData = async (url, json, page) => {
  await page.route(`${apiBasePath}${url}**`, async route => {
    const response = await route.fetch()
    await route.fulfill({ response, json })
  })
}
