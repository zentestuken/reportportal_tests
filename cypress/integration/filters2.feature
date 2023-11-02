@ui
Feature: Filters BDD UI tests - part 2

Background:
  Given I open "Filters" page
  And random name, description were generated

@edit
Scenario: Edit a filter
  When I open existing filter
  Then "Launches" page opens
  When I update opened filter with random name and description
  And I open "Filters" page
  Then "Filters" page opens
  And filter row with updated data is shown
  And filter row with original data is not shown

@clone
Scenario: Clone a filter
  When I open existing filter
  Then "Launches" page opens
  When I clone opened filter and update random name and description
  And I open "Filters" page
  Then "Filters" page opens
  And filter row with updated data is shown
  And filter row with original data is shown
