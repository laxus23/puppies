# Puppy Adoption Automation

## Description

This project contains automated tests written in JavaScript using the Selenium WebDriver library to automate tests for a puppy adoption web application.

The tests verify various functions of the application, such as navigation across pages, adding products to the cart, the adoption process, and proper information display on the page.

## Requirements

To run the automated tests, you need to have the following tools installed:

- [Node.js](https://nodejs.org) - JavaScript runtime environment
- [npm](https://www.npmjs.com) - package manager for JavaScript
- Web browser supported by Selenium WebDriver (Google Chrome)

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/laxus23/puppies.git

Running Tests
To run the automated tests, execute the following command in your terminal:
npm test

The tests will be executed in a web browser (default is Chrome) and the results will be reported in the console.

Project Structure
    features/: Contains files with descriptions of test scenarios in Cucumber format
    step_definitions/: Contains files with definitions of test steps in JavaScript
    package.json: npm configuration file with a list of dependencies and scripts
    README.md: This file containing information about the project