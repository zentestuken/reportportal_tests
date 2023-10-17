import { defineConfig } from 'cypress'
import { projectName } from './environment/constants.js'

export default defineConfig({
  e2e: {
    baseUrl: `http://127.0.0.1:8080/ui/${projectName}/`,
    apiBaseUrl: `http://127.0.0.1:8080/api/v1/${projectName}/`,
    supportFile: 'cypress/support/e2e.js'
    // setupNodeEvents (on, config) {
    //   require('cypress-mochawesome-reporter/plugin')(on)
    // }
  },
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Test Run Report',
    reportDir: 'reports/data',
    overwrite: false,
    mochaFile: 'report.html',
    // reportFileName: 'report[hash].html',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    html: false,
    json: true
  }
})
