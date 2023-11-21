class FilterFacet {
  constructor (name, page) {
    this.rootEl = () => page.locator('div[class^="fieldFilterEntity"]').filter({ hasText: name })
  }

  select () { return this.rootEl().locator('div[class*="__conditions-selector"]') }
  option (optionName) { return this.rootEl().locator('div[class*="__condition-"]').filter({ hasText: new RegExp(`^${optionName}$`) }) }
  selectedOption () { return this.rootEl().locator('div[class^="inputConditional"][class*="__active"]') }
  input () { return this.rootEl().locator('div[class*="input-"] input') }
  keyInput () { return this.rootEl().locator('input[placeholder="Key"]') }
  valueInput () { return this.rootEl().locator('input[placeholder="Value"]') }
  autoCompleteOption (optionName) { return this.rootEl().locator('li[class^="autocompleteOption"]').filter({ hasText: new RegExp(`^${optionName}$`) }) }
  keyAdded () { return this.rootEl().locator('div[class^="attribute__key"]') }
  valueAdded () { return this.rootEl().locator('div[class^="attribute__value"]') }
  keyValueConfirmBtn () { return this.rootEl().locator('div[class*="attributeEditor__check-icon"]') }
  simpleInputAdded () { return this.rootEl().locator('div[class*="__selected-item-"]') }
}

export default FilterFacet
