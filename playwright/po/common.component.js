export class SideBar {
  constructor (page) {
    this.filtersBtn = () => page.locator('div[class^="sidebarButton"]').filter({ hasText: 'Filters' })
    this.launchesBtn = () => page.locator('div[class^="sidebarButton"]').filter({ hasText: 'Launches' })
  }
}

export class AddFilterBtn {
  constructor (page) {
    return () => page.locator('button').filter({ hasText: /Add filter/i })
  }
}
