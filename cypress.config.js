import { defineConfig } from 'cypress'
import { envData, envDataLocal } from './environment/constants.js'
import 'dotenv/config'

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents (on, config) {
      config.env = {
        ...process.env,
        ...config.env
      }
      const environment = config.env.ENV === 'local' ? envDataLocal : envData
      config.baseUrl = `${environment.baseURL}/ui/${environment.projectName}/`
      config.apiBaseUrl = `${environment.baseURL}/api/v1/${environment.projectName}/`
      config.username = environment.username
      config.password = config.env.ENV === 'local' ? config.env.RP_PASSWORD_LOCAL : config.env.RP_PASSWORD
      config.apiToken = config.env.ENV === 'local' ? config.env.RP_APITOKEN_LOCAL : config.env.RP_APITOKEN
      return config
    }
  },
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Test Run Report',
    reportDir: 'reports/data',
    overwrite: false,
    mochaFile: 'report.html',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    html: false,
    json: true
  }
})
