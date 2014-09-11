Feature: Render A Map

Scenario: Can render a map
  Given I have a sample dataset
  And I have a style
  When I attempt to render a map
  Then I should see an image

