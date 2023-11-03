@ui
Feature: Filters BDD UI tests - part 1

Background:
  Given I open "Filters" page
  And random name, description were generated

@create
Scenario Outline: Add a new filter
  When I click `Add Filter` button
  Then "Launches" page opens
  When I fill facet "<Facet name 1>" with values "<Values 1>"
  Then facet "<Facet name 1>" has values "<Values 1>"
  When I add facet "<Facet name 2>"
  And I fill facet "<Facet name 2>" with values "<Values 2>"
  Then facet "<Facet name 2>" has values "<Values 2>"
  When I save a filter using name random name and description
  And I open "Filters" page
  Then "Filters" page opens
  And filter row with created filter is shown

Examples:
|Facet name 1|Values 1|Facet name 2|Values 2|
|Launch name|Contains, Demo|Attribute|Any, platform, linux, build, 3.11.18.45.5|
|Launch name|Contains, Api|Owner|yauhenuser|

@delete
Scenario: Delete a filter
  When I delete existing filter
  Then filter row with deleted filter is not shown

@delete2
Scenario: Delete a filter (duplicate)
  When I delete existing filter
  Then filter row with deleted filter is not shown