class SideBar {
  constructor () {
    this.filtersBtn = () => cy.contains('div[class^="sidebarButton"]', 'Filters')
    this.launchesBtn = () => cy.contains('div[class^="sidebarButton"]', 'Launches')
    // return cy.get('div[class^="layout__sidebar-container-"]')
  }
}

export const sideBar = new SideBar()
export const addFilterBtn = () => cy.contains('button', 'Add filter', { matchCase: false })
