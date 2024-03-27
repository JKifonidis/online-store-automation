## Overview:

***This project is under development***

**1. Project structure:**
   - The repository follows a standard Playwright project structure, with directories for tests, fixtures and configuration files
   - Key files and directories:
     - tests/ - contains test scripts for different scenarios
     - test-data/ - contains all test data for execution
     - utils/ - contains shared functionalities for all the tests
     - playwright.config.js - configuration file for Playwright setup
     - package.json - configuration file for Node.js dependencies and scripts
     - .gitignore - files and folders to be ignored by Git

**2. Dependencies:**
   - Node.js and npm are required to install and run the project dependencies
   - Playwright is the primary dependency for automation and testing

**3. Test scripts:**
   - Test scripts within the tests/ directory cover various scenarios for automating interactions with an online store
   - These scripts include the following scenarios: account creation, login, logout, add and remove product from cart

**4. Configuration:**
   - Configuration file contains setup related to browsers, devices, timeouts,  parallelisation, failed test retries, number of workers, reporter and test documenting used during test execution

## Instruction for Use:

**1. Prerequisites:**
   - Node.js and npm: Ensure Node.js and npm are installed on your machine. You can download and install them from Node.js website

**2. Setup Instructions:**
   - Clone the repository:
     - git clone https://<i></i>github.com/Jkifonidis/online-store-automation.git
   - Install Dependencies:
     - npm install

**3. Running Tests:**
   - Configuration:
     - Open the playwright.config.js configuration file in the project root directory and adjust it as per your requirements

**4. Executing Tests:**
   - To run the tests, execute the following command:
     - npm playwright test
   - This command will trigger execution of the test scripts defined in the tests/ directory using Playwright

**5. Viewing Test Results:**
   - To open a test report after execution has finished use:
     - npx playwright show-report
   - A html raport will be generated indicating the status of each test case and any failures encountered
