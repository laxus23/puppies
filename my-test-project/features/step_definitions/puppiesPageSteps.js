const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert').strict;

let driver;
setDefaultTimeout(20 * 1000); 
const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: './reports/cucumber_report.json',
    output: './reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "STAGING",
        "Browser": "Chrome  97.0.4692.99",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Local"
    }
};

reporter.generate(options);

// Selectors definition
const selectors = {
  viewDetailsButton: (puppyName) => `//h3[contains(text(), '${puppyName}')]/../..//input[@value='View Details']`,
  detailHeader: (puppyName) => `//h2[contains(text(), '${puppyName}')]`,
  puppyListHeader: "//h2[contains(text(), 'Puppy List')]",
  nextPageButton: "//a[text()='Next →']",
  adoptionFee: "//h3[contains(text(), 'Adoption Fee')]/../span",
  adoptMeButton: "//input[@value='Adopt Me!']",
  completeTheAdoptionButton: "//input[@value='Complete the Adoption']",
  changeYourMindButton: "//input[@value='Change your mind']",
  adoptAnotherPuppyButton: "//input[@value='Adopt Another Puppy']",
  nameField: "order_name",
  addressField: "order_address",
  emailField: "order_email",
  payTypeSelect: "order_pay_type",
  placeOrderButton: "//input[@value='Place Order']",
  travelCarrierCheckbox: "//input[@id='carrier']",
  firstVetVisitCheckbox: "//input[@id='vet']",
  collarLeashCheckbox: "//input[@id='collar']",
  completeTheAdoptionButton: "//input[@value='Complete the Adoption']",
  nameField: "order_name",
  addressField: "order_address",
  emailField: "order_email",
  payTypeSelect: "order_pay_type",
  placeOrderButton: "//input[@value='Place Order']",
  changeYourMindButton: "//input[@type='submit'][@value='Change your mind']",
  basePriceElement: 'td.item_price h2',
  carrierOptionText: "//*[contains(text(), 'Travel Carrier')]",
  carrierCheckbox: 'input[name="carrier"]',
  totalPriceElement: 'td.total_cell h2'
};
Before(async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://spartantest-puppies.herokuapp.com/');
});

After(async function () {
  await driver.quit();
});

Given('I am on the puppy list page', async function () {
  const puppyListHeader = await driver.findElement(By.xpath(selectors.puppyListHeader));
  const isDisplayed = await puppyListHeader.isDisplayed();
  assert.strictEqual(isDisplayed, true, 'Puppy list page is not displayed');
});


Given('I am on the second page of the puppy list', async function () {
  const nextPageButton = await driver.wait(until.elementLocated(By.css("a.next_page")), 10000);
  await nextPageButton.click();
  await driver.wait(until.urlContains('page=2'), 10000);
});

When('I view details for the puppy named {string}', async function (puppyName) {
  let found = false;
  let hasNextPage = true;

  while (!found && hasNextPage) {
    try {
      let puppy = await driver.wait(until.elementLocated(By.xpath(selectors.viewDetailsButton(puppyName))), 1000);
      if (puppy) {
        console.log(`Puppy named "${puppyName}" found!`);
        await puppy.click();
        found = true;
      }
    } catch (error) {
      // If the puppy is not on the page, look for the "Next" button
      try {
        let nextPageButton = await driver.findElement(By.css("a.next_page"));
        await nextPageButton.click();
        console.log("Going to the next page...");
      } catch (error) {
        console.log("No more pages or error navigating pages. Puppy not found.");
        hasNextPage = false;
      }
    }
  }
  if (!found) {
    throw new Error(`Puppy named "${puppyName}" not found across the pages.`);
  }
});

When('I return to the puppy list', async function () {
  await driver.navigate().back();
});

When('I add a travel carrier', async function () {
  const carrierCheckbox = await driver.findElement(By.xpath(selectors.travelCarrierCheckbox));
  if (!await carrierCheckbox.isSelected()) {
    await carrierCheckbox.click();
  }
  
});

When('I add a travel carrier for "Maggie Mae"', async function () {
  const carrierCheckboxes = await driver.findElements(By.xpath(selectors.travelCarrierCheckbox));
// Make sure there is more than one checkbox before trying to access the second element
  if (carrierCheckboxes.length > 1 && !await carrierCheckboxes[1].isSelected()) {
    await carrierCheckboxes[1].click();
  }
});


When('I add first vet visit and a collar and leash for "Brook"', async function () {
  const firstVetVisitCheckbox = await driver.findElement(By.xpath(selectors.firstVetVisitCheckbox));
  if (!await firstVetVisitCheckbox.isSelected()) {
    await firstVetVisitCheckbox.click();
  }
  const collarLeashCheckbox = await driver.findElement(By.xpath(selectors.collarLeashCheckbox));
  if (!await collarLeashCheckbox.isSelected()) {
    await collarLeashCheckbox.click();
  }
  
});

When('I complete the adoption with a credit card', async function () {
  const completeAdoptionButton = await driver.wait(until.elementLocated(By.xpath(selectors.completeTheAdoptionButton)), 10000); 
  await completeAdoptionButton.click();

  // wait for the adoption form to load
  
  const nameField = await driver.wait(until.elementLocated(By.id(selectors.nameField)), 5000);
  await nameField.sendKeys('Test User');
  const addressField = await driver.wait(until.elementLocated(By.id(selectors.addressField)), 5000);
  await addressField.sendKeys('123 Test Address');
  const emailField = await driver.wait(until.elementLocated(By.id(selectors.emailField)), 5000);
  await emailField.sendKeys('test@example.com');
  
  // Wait for the payment dropdown and select the "Credit card" option
  const payTypeDropdown = driver.wait(until.elementLocated(By.id(selectors.payTypeSelect)), 5000);
  await payTypeDropdown.findElement(By.xpath(".//option[.='Credit card']")).click();
  
  // Wait until the "Place Order" button is available before clicking
  const placeOrderButton = await driver.wait(until.elementLocated(By.xpath(selectors.placeOrderButton)), 10000); 
  await placeOrderButton.click();
});
  
When('I click the Adopt Me! button', async function () {
  const adoptMeButton = await driver.findElement(By.xpath("//input[@type='submit'][@value='Adopt Me!']"));
  await adoptMeButton.click();
});

When('I click the Adopt Another Puppy button', async function () {
  const adoptAnotherPuppyButton = await driver.findElement(By.xpath("//input[@type='submit'][@value='Adopt Another Puppy']"));
  await adoptAnotherPuppyButton.click();
});

Then('the total amount should reflect the price of the travel carrier', async function () {
  // Find the element showing the base price
  const basePriceElement = await driver.findElement(By.css(selectors.basePriceElement));
  const basePriceText = await basePriceElement.getText();
  const basePrice = parseFloat(basePriceText.replace('£', ''));

  // Find the description and price of the travel carrier
  const carrierOptionText = await driver.findElement(By.xpath(selectors.carrierOptionText)).getText();
  const carrierPriceMatch = carrierOptionText.match(/£(\d+\.\d+)/);
  if (!carrierPriceMatch) throw new Error("Cannot find the price of the travel carrier.");
  const carrierPrice = parseFloat(carrierPriceMatch[1]);
    
  // Select the travel carrier option
  const carrierCheckbox = await driver.findElement(By.css(selectors.carrierCheckbox));
  await carrierCheckbox.click();
  
  // Wait for price update

  // Find the element showing the total amount
  const totalPriceElement = await driver.findElement(By.css(selectors.totalPriceElement));
  const totalPriceText = await totalPriceElement.getText();
  const totalPrice = parseFloat(totalPriceText.replace('£', ''));

  // Calculate the expected total amount
  const expectedTotalPrice = basePrice + carrierPrice;

  // Compare the calculated total amount with the amount displayed on the page
  assert.strictEqual(totalPrice, expectedTotalPrice, `Expected total price to be £${expectedTotalPrice}, but found £${totalPrice}`);
});

Then('the adoption has been completed for {string} and {string}', async function (name1, name2) {
  // Wait for an element to appear with confirmation text for the first name
  await driver.wait(until.elementLocated(By.xpath(`//h2[contains(text(), '${name1}:')]`)), 10000);
  // Wait for an element to appear with confirmation text for the middle name
  await driver.wait(until.elementLocated(By.xpath(`//h2[contains(text(), '${name2}:')]`)), 10000);

  // Fetch text from the entire body of the page and verify that it contains the expected animal names
  const confirmationText = await driver.findElement(By.tagName('body')).getText();
  assert(confirmationText.includes(`${name1}:`) && confirmationText.includes(`${name2}:`), "Adoption confirmation does not include expected names.");
});

Then('the adoption fee should be {string}', async function (expectedFee) {
  // Use the CSS selector to locate the element containing the adoption fee
  const feeElement = await driver.findElement(By.css('.fees'));
  const feeText = await feeElement.getText();

  // Assuming the text format is "The fees to adopt me are £22.50"
  // Extract the full fee amount from the text, including the currency symbol
  const actualFee = feeText.match(/£[\d,.]+/)[0];

  // Compare the actual adoption fee with the expected one, including the currency symbol
  assert.strictEqual(actualFee, expectedFee, `Expected adoption fee: ${expectedFee}, but found: ${actualFee}`);
});

Then('I should see the puppy list', async function () {
  await driver.wait(until.elementLocated(By.xpath(selectors.puppyListHeader)), 10000);
  const h2 = await driver.findElement(By.xpath(selectors.puppyListHeader));
  const isDisplayed = await h2.isDisplayed();
  assert(isDisplayed, true);
});

Then('I should see {string} on the page', async function (puppyName) {
  let isPuppyFound = false;
  
  await driver.wait(until.elementsLocated(By.xpath(`//h3`)), 10000);

  // Get all h3 elements that may contain puppy names
  const puppyNames = await driver.findElements(By.xpath(`//h3`));
  
  // Iterate through the elements to find the name you are looking for
  for (const nameElement of puppyNames) {
    const nameText = await nameElement.getText();
    if (nameText.includes(puppyName)) {
      isPuppyFound = true;
      break;
    }
  }

  // Check if the puppy you are looking for has been found
  assert(isPuppyFound, `Puppy named ${puppyName} was not found on the page.`);
});

Then('I should see details for {string}', async function (puppyName) {
  await driver.wait(until.elementLocated(By.xpath(selectors.detailHeader(puppyName))), 10000);
  const detailHeader = await driver.findElement(By.xpath(selectors.detailHeader(puppyName)));
  const isDisplayed = await detailHeader.isDisplayed();
  assert(isDisplayed, true);
});

Then('I click the change your mind button', async function () {
  const changeYourMindButton = await driver.findElement(By.xpath(selectors.changeYourMindButton));
  await changeYourMindButton.click();
});

Then('the adoption has been completed', async function () {
  const confirmationMessageElement = await driver.wait(until.elementLocated(By.id("notice")), 10000);
  const confirmationMessage = await confirmationMessageElement.getText();
  assert.strictEqual(confirmationMessage, "Thank you for adopting a puppy!", "The confirmation message does not match the expected text.");
});