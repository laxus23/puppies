Feature: Puppy Adoption Site Interactions

  Scenario: View details for the puppy Hanna and return to the puppy list
    Given I am on the puppy list page
    When I view details for the puppy named "Hanna"
    Then I should see details for "Hanna"
    When I return to the puppy list
    Then I should see the puppy list

  Scenario: Verify that the puppy Maggie May is on the first page
    Given I am on the puppy list page
    Then I should see "Maggie Mae" on the page

  Scenario: Verify that the puppy Tipsy is on the second page
    Given I am on the second page of the puppy list
    Then I should see "Tipsy" on the page

  Scenario: View the details for Twinky and verify their adoption fee is $22.50
    Given I am on the puppy list page
    When I view details for the puppy named "Twinkie"
    Then the adoption fee should be "£22.50"

  Scenario: View the details for Spud, click Adopt Me, and then click the change your mind button
    Given I am on the puppy list page
    When I view details for the puppy named "Spud"
    And I click the Adopt Me! button
    Then I click the change your mind button
    And I should see the puppy list

  Scenario: Adopt Hanna and then Maggie Mae
    Given I am on the puppy list page
    When I view details for the puppy named "Hanna"
    And I click the Adopt Me! button
    And I click the Adopt Another Puppy button
    And I view details for the puppy named "Maggie Mae"
    And I click the Adopt Me! button
    Then the adoption has been completed for "Hanna" and "Maggie Mae"

  Scenario: Complete the adoption with a credit card and verify the adoption has been completed
    Given I am on the puppy list page
    When I view details for the puppy named "Hanna"
    And I click the Adopt Me! button
    And I complete the adoption with a credit card
    Then the adoption has been completed

  Scenario: Adopt Brook and add a travel carrier, verify the total amount increases by the price of the carrier
    Given I am on the puppy list page
    When I view details for the puppy named "Brook"
    And I click the Adopt Me! button
    And I add a travel carrier
    Then the total amount should reflect the price of the travel carrier

  Scenario: Adopt Brook and Maggie Mae. Add a first vet visit and a collar and leash for Brook, and add a travel carrier for Maggie Mae. 
  Complete the adoption with a credit card, and verify the adoption has been completed

    Given I am on the puppy list page
    When I view details for the puppy named "Brook"
    And I click the Adopt Me! button
    And I click the Adopt Another Puppy button
    And I view details for the puppy named "Maggie Mae"
    And I click the Adopt Me! button
    And I add first vet visit and a collar and leash for "Brook"
    And I add a travel carrier for "Maggie Mae"
    And I complete the adoption with a credit card
    Then the adoption has been completed
