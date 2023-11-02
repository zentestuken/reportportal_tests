import LoginPage from './login.page.js'
import LaunchesPage from './launches.page.js'
import FilterPage from './filter.page.js'

export default (pageName) => {
  switch (pageName) {
    case 'Filters':
      return new FilterPage()
    case 'Launches':
      return new LaunchesPage()
    case 'Login':
      return new LoginPage()
    default:
      throw new Error(`Page "${pageName}" is not defined!`)
  }
}
