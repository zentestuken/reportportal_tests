import { defineConfig } from 'cypress'
import { envData, envDataLocal } from './environment/constants.js'
import 'dotenv/config'
import fs from 'node:fs'
// eslint-disable-next-line import/no-named-default
import cucumber from 'cypress-cucumber-preprocessor'

const mochawesomeOptions = JSON.parse(fs.readFileSync('./parallel-reporter-config.json')).mochawesomeReporterOptions

export default defineConfig({
  e2e: {
    specPattern: ['**/*.feature', '**/tests/*.cy.js'],
    supportFile: 'cypress/support/e2e.js',
    defaultCommandTimeout: 10000,
    async setupNodeEvents (on, config) {
      // await cucumber.addCucumberPreprocessorPlugin(on, config)
      await on('file:preprocessor', cucumber.default())
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
  reporterOptions: mochawesomeOptions
})
