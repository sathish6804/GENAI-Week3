/**
 * Collection of default prompts for different use cases (ICE POT Format)
 */
export const DEFAULT_PROMPTS = {
 
  /**
   * Selenium Java Page Object Prompt (No Test Class)
   */
  SELENIUM_JAVA_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Selenium Java Page Object Class (no test code).
    - Add JavaDoc for methods & class.
    - Use Selenium 2.30+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`java
    package com.testleaf.pages;

    /**
     * Page Object for Component Page
     */
    public class ComponentPage {
        // Add methods as per the DOM
    }
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure.

    Output Format:
    - A single Java class inside a \`\`\`java\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
     * Page Object for Component Page
     */

  PLAYWRIGHT_FEATURE_FILE: `
    Instructions:
    - Generate ONLY a Playwright TypeScript Page Object Class (no test code).
    - Add JSDoc for methods & class.
    - Use Playwright 1.40+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`typescript
    import { Page, Locator } from '@playwright/test';

    /**
     * Page Object for Component Page
     */
    export class ComponentPage {
        // Add methods as per the DOM
    }
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable Page Object Model structure.

    Output Format:
    - A single TypeScript class inside a \`\`\`typescript\`\`\` block.

    Tone:
     Clean, maintainable, enterprise-ready.
  `,

  /**
   * Playwright TypeScript Page Object (Page Only)
   */
  PLAYWRIGHT_TYPESCRIPT_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Playwright TypeScript Page Object Class (no test code).
    - Add JSDoc for methods & class.
    - Use Playwright 1.40+ compatible imports from '@playwright/test'.
    - Use meaningful method names and Locator typing.
    - Do NOT include explanations or test code.

  Context:
  DOM:
  \`\`\`html
  \${domContent}
  \`\`\`

  Example:
  \`\`\`typescript
    import { Page, Locator } from '@playwright/test';

    /**
     * Page Object for Component Page
     */
    export class ComponentPage {
        readonly page: Page;
        readonly someButton: Locator;

        constructor(page: Page) {
            this.page = page;
            this.someButton = page.locator('button#some');
        }

        async clickSomeButton(): Promise<void> {
            await this.someButton.click();
        }
  }
  \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable Page Object Model structure in TypeScript.

  Output Format:
  - A single TypeScript class inside a \`\`\`typescript\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Test data for Selenium Java (Examples + Java provider class)
   */
  TESTDATA_FOR_SELENIUM_JAVA: `
    Instructions:
    - Generate realistic test data for the scenarios derived from the provided DOM.
    - Provide:
      1) A Gherkin Examples table suitable for use in a Scenario Outline.
      2) A simple Java class (POJO or data provider) that contains the same sample rows as static data.
    - Use South India realistic dataset (names, addresses, pin codes, mobile numbers) where applicable.

  Context:
  DOM:
  \`\`\`html
  \${domContent}
  \`\`\`

  Output Format:
  - Gherkin Examples table inside a \`\`\`gherkin\`\`\` block.
  - Java class inside a \`\`\`java\`\`\` block.

    Tone:
    - Realistic, compact, ready-to-use.
  `,

  /**
   * Test data for Playwright TypeScript (JSON + TS fixtures)
   */
  TESTDATA_FOR_PLAYWRIGHT_PAGE: `
    Instructions:
    - Generate test data relevant to the provided DOM.
    - Provide:
      1) A JSON array of objects representing multiple test rows.
      2) A TypeScript fixture example showing how to import/use the JSON.
    - Use realistic sample values and keep strings concise.

  Context:
  DOM:
  \`\`\`html
  \${domContent}
  \`\`\`

  Output Format:
  - JSON in a \`\`\`json\`\`\` block.
  - TypeScript example in a \`\`\`typescript\`\`\` block.

    Tone:
    - Practical, ready-to-import.
  `,

  /**
   * Test data for Feature files (Examples table only)
   */
  TESTDATA_FOR_FEATURE: `
    Instructions:
    - Generate a Gherkin Examples table for the feature scenarios that match the provided DOM.
    - Provide 3-5 realistic rows using South India realistic dataset where appropriate.

  Context:
  DOM:
  \`\`\`html
  \${domContent}
  \`\`\`

  Output Format:
  - Only an Examples table inside a \`\`\`gherkin\`\`\` block.

    Tone:
    - Clear, structured, realistic.
  `,

  /**
   * Generic test data only (JSON array)
   */
  TESTDATA_ONLY: `
    Instructions:
    - Generate a JSON array of test rows derived from the DOM.
    - Include 3 sample objects with keys named after form fields or visible labels.

  Context:
  DOM:
  \`\`\`html
  \${domContent}
  \`\`\`

  Output Format:
  - JSON only inside a \`\`\`json\`\`\` block.

    Tone:
    - Concise, usable.
  `,

  /**
   * Cucumber Feature File Only Prompt
   */
  CUCUMBER_ONLY: `
    Instructions:
    - Generate ONLY a Cucumber (.feature) file.
    - Use Scenario Outline with Examples table.
    - Make sure every step is relevant to the provided DOM.
    - Do not combine multiple actions into one step.
    - Use South India realistic dataset (names, addresses, pin codes, mobile numbers).
    - Use dropdown values only from provided DOM.
    - Generate multiple scenarios if applicable.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "testuser" | "testpass"|
      | "admin"    | "admin123"|
    \`\`\`

    Persona:
    - Audience: BDD testers who only need feature files.

    Output Format:
    - Only valid Gherkin in a \`\`\`gherkin\`\`\` block.

    Tone:
    - Clear, structured, executable.
  `,

   /**
   * playwright generator code
   */

 
  /**
   * Cucumber with Step Definitions
   */
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Java step definition class for selenium.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Selenium code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
\      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`java
    package com.leaftaps.stepdefs;

    import io.cucumber.java.en.*;
    import org.openqa.selenium.*;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.*;

    public class LoginStepDefinitions {
        private WebDriver driver;
        private WebDriverWait wait;

        @io.cucumber.java.Before
        public void setUp() {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            driver.manage().window().maximize();
        }

        @io.cucumber.java.After
        public void tearDown() {
            if (driver != null) driver.quit();
        }

        @Given("I open the login page")
        public void openLoginPage() {
            driver.get("\${pageUrl}");
        }

        @When("I type {string} into the Username field")
        public void enterUsername(String username) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("username")));
            el.sendKeys(username);
        }

        @When("I type {string} into the Password field")
        public void enterPassword(String password) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("password")));
            el.sendKeys(password);
        }

        @When("I click the Login button")
        public void clickLogin() {
            driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();
        }

        @Then("I should be logged in successfully")
        public void verifyLogin() {
            WebElement success = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("success")));
            assert success.isDisplayed();
        }
    }
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Selenium.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Java code in \`\`\`java\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `
};

/**
 * Helper function to escape code blocks in prompts
 */
function escapeCodeBlocks(text) {
  return text.replace(/```/g, '\\`\\`\\`');
}

/**
 * Function to fill template variables in a prompt
 */
export function getPrompt(promptKey, variables = {}) {
  let prompt = DEFAULT_PROMPTS[promptKey];
  if (!prompt) {
    throw new Error(`Prompt not found: ${promptKey}`);
  }

  Object.entries(variables).forEach(([k, v]) => {
    const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
    prompt = prompt.replace(regex, v);
  });

  return prompt.trim();
}

export const CODE_GENERATOR_TYPES = {
  SELENIUM_JAVA_PAGE_ONLY: 'Selenium-Java-Page-Only',
  CUCUMBER_ONLY: 'Cucumber-Only',
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: 'Cucumber-With-Selenium-Java-Steps',
  PLAYWRIGHT_FEATURE_FILE: 'Playwright-Feature-File'
  ,PLAYWRIGHT_TYPESCRIPT_PAGE_ONLY: 'Playwright-Typescript-Page-Only'
};
