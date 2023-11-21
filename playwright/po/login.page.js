import { envData, envDataLocal } from '../../environment/constants'
import 'dotenv/config'

const environment = process.env.ENV === 'local' ? envDataLocal : envData
const password = process.env.ENV === 'local' ? process.env.RP_PASSWORD_LOCAL : process.env.RP_PASSWORD

class LoginPage {
  constructor (page) {
    this.page = page
    this.url = '/'
  }

  async login () {
    await this.page.goto('/')
    await this.page.locator('input[name="login"]').waitFor({ state: 'visible' })
    await this.page.waitForTimeout(2000)
    await this.page.locator('input[name="login"]').fill(environment.username)
    await this.page.locator('input[name="password"]').fill(password)
    await this.page.locator('div[class*="login-button"] button').click()
    await this.page.waitForTimeout(2000)
  }

  async logout () {
    await this.page.getByRole('img', { name: 'avatar' }).click()
    await this.page.locator('div[class^=userBlock__menu-item]').filter({ hasText: 'Logout' }).click({ force: true })
    await this.page.locator('input[name="login"]').waitFor({ state: 'visible' })
  }
}

export default LoginPage
