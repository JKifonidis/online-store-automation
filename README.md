    1. Project structure:
        ◦ The repository follows a standard Playwright project structure, with directories for tests, fixtures, and configuration files.
        ◦ Key files and directories:
            ▪ tests/: Contains test scripts for different scenarios.
            ▪ test-data/: Contains all test data for execution
            ▪ utils/: Contains shared functionalities for all the tests
            ▪ playwright.config.js: Configuration files for Playwright setup.
            ▪ package.json: Configuration file for Node.js dependencies and scripts.
            ▪ .gitignore: Files and folders to be ignored by Git
    2. Dependencies:
        ◦ Node.js and npm are required to install and run the project dependencies.
        ◦ Playwright is the primary dependency for automation and testing.
    3. Test scripts:
        ◦ Test scripts within the tests/ directory cover various scenarios for automating interactions with an online store.
        ◦ These scripts include the following scenarios: account creation, login, logout, add and remove product from cart.
    4. Configuration:
        ◦ Configuration file contains setup related to browsers, devices, timeouts,  parallelisation, failed test retries, number of workers, reporter and test documenting used during test execution.
Instruction for Use:
Prerequisites:
    1. Node.js and npm: Ensure Node.js and npm are installed on your machine. You can download and install them from Node.js website.
Setup Instructions:
    1. Clone the repository:
       git clone https://github.com/Jkifonidis/online-store-automation.git
    2. Install Dependencies:
       npm install
Running Tests:
    1. Configuration:
        ◦ Open the playwright.config.js configuration file in the project root directory and adjust it as per your requirements.
    2. Executing Tests:
        ◦ To run the tests, execute the following command:
          npm playwright test
        ◦ This command will trigger execution of the test scripts defined in the tests/ directory using Playwright.
    3. Viewing Test Results:
        ◦ npx playwright show-report command will open a test report after execution has finished, an html raport will be generated indicating the status of each test case and any failures encountered.
Customization and Extension:
    1. Adding Tests:
        ◦ To add new test cases, create additional test scripts within the tests/ directory following the same format as existing scripts.
    2. Modifying Configuration:
        ◦ Adjust the playwright.config.js configuration file to customize browser options, test URLs, etc. based on your testing environment.
    3. Integrating with CI/CD:
        ◦ You can integrate this automation project with Continuous Integration/Continuous Deployment (CI/CD) pipelines like Jenkins, Travis CI, or GitHub Actions for automated testing on every code commit.
Troubleshooting:
    1. Dependency Errors:
        ◦ If you encounter dependency-related errors, ensure Node.js and npm are properly installed, and try running npm install again.
    2. Test Failures:
        ◦ If tests fail, inspect the error messages provided in the console to identify the cause. Check test scripts, configurations, and environmental factors.
    3. Debugging:
        ◦ Utilize debugging tools provided by Playwright including Traces functionality for detailed insights into test execution and browser interactions.
Conclusion:
In conclusion, the provided instructions enable users to effectively set up and utilize the Playwright automation project for testing an online store. By following these steps, users can seamlessly run tests, customize configurations, and extend functionality as per their requirements. Regular maintenance and updates to test scripts and configurations will ensure the reliability and effectiveness of the automated testing suite over time.
