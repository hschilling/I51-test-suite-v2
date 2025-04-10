const { test, expect } = require('@playwright/test');

// Test the home page and counter functionality
test('homepage should have a working counter', async ({ page }) => {
  // Navigate to the application
  await page.goto('/');
  
  // Verify the page title
  await expect(page).toHaveTitle(/My Node App/);
  
  // Verify the h1 text
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Welcome to My Node App');
  
  // Test the counter functionality
  const counter = page.locator('#counter');
  const incrementBtn = page.locator('#increment-btn');
  
  // Check initial counter value
  await expect(counter).toHaveText('0');
  
  // Click the increment button and verify the counter increases
  await incrementBtn.click();
  await expect(counter).toHaveText('1');
  
  // Click twice more and verify the counter value
  await incrementBtn.click();
  await incrementBtn.click();
  await expect(counter).toHaveText('3');
});

// Test the API endpoint
test('API should return the correct message', async ({ request }) => {
  // Send a GET request to the API endpoint
  const response = await request.get('/api/hello');
  
  // Verify the response status
  expect(response.status()).toBe(200);
  
  // Verify the response data
  const data = await response.json();
  expect(data).toEqual({ message: 'Hello from the API!' });
});

// Test with a test fixture HTML file
test('test page fixture loads correctly', async ({ page }) => {
  // This demonstrates how to use a fixture file for testing
  await page.goto('file://' + __dirname + '/fixtures/test-page.html');
  
  // Verify the content of the test page
  const pageText = page.locator('#test-content');
  await expect(pageText).toHaveText('This is a test page for Playwright');
});
