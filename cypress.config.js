import { defineConfig } from 'cypress'
import { projectName } from './environment/constants.js'

export default defineConfig({
  e2e: {
    baseUrl: `http://127.0.0.1:8080/ui/${projectName}/`,
    apiBaseUrl: `http://127.0.0.1:8080/api/v1/${projectName}/`,
    supportFile: false
    // setupNodeEvents (on, config) {
    //   // implement node event listeners here
    // }
  }
})
