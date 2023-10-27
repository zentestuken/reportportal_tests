import axios from 'axios'
import 'dotenv/config'
import { envData, envDataLocal } from '../environment/constants.js'

const environment = process.env.ENV === 'local' ? envDataLocal : envData
const apiBaseUrl = `${environment.baseURL}/api/v1/${environment.projectName}/`
const apiToken = process.env.ENV === 'local' ? process.env.RP_APITOKEN_LOCAL : process.env.RP_APITOKEN

export { axios, apiBaseUrl, apiToken }
