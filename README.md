# Node.js App with Playwright Testing and GitHub Actions

This is a simple Node.js application that demonstrates how to set up automated testing using Playwright and GitHub Actions.

## Project Structure

```
my-node-app/
├── src/
│   └── app.js                  # Main application file
├── tests/
│   ├── example.spec.js         # Playwright test file
│   └── fixtures/
│       └── test-page.html      # HTML fixture for testing
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions workflow
├── package.json
├── playwright.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/my-node-app.git
   cd my-node-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install Playwright browsers:
   ```
   npx playwright install
   ```

### Running the Application

Start the application:
```
npm start
```

The app will be available at `http://localhost:3000`.

## Running Tests

### Run all tests

```
npm test
```

### Run tests in headed mode (with browser UI)

```
npm run test:headed
```

### Run tests with Playwright UI mode

```
npm run test:ui
```

## GitHub Actions Integration

This project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that automatically runs Playwright tests when:

- Code is pushed to the main/master branch
- A pull request is made to the main/master branch
- The workflow is manually triggered

The workflow:
1. Sets up Node.js
2. Installs dependencies
3. Installs Playwright browsers
4. Runs the tests
5. Uploads test results as artifacts

## Customizing Tests

- Add new test files in the `tests` directory
- Update `playwright.config.js` to customize test behavior
- Add more test fixtures in the `tests/fixtures` directory

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
