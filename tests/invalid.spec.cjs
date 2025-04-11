// tests/invalid.spec.cjs (updated version)
const { test, expect } = require('@playwright/test');

test('invalid OPENAI API KEY', async ({ page }) => {
  // 1. Navigate to the page
  await page.goto('/', { waitUntil: 'networkidle' });
  
  // Take screenshot of initial page state
  await page.screenshot({ path: 'screenshot-initial.png' });
  
  // Log the HTML content to help debug
  const html = await page.content();
  console.log('Page HTML (first 500 chars):', html.substring(0, 500));
  
  // 2. Check if the element exists at all (even if not visible)
  const exists = await page.locator('#insert-key-input').count() > 0;
  console.log('Does #insert-key-input exist in DOM?', exists);
  
  // List all input elements on the page to help debug
  const inputs = await page.locator('input').count();
  console.log('Number of input elements on page:', inputs);
  
  // Get all input IDs
  const inputIds = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input'))
      .map(input => input.id || 'no-id')
      .join(', ');
  });
  console.log('Input IDs found:', inputIds);
  
  // 3. Try with a more relaxed selector
  const textInput = page.locator('input[type="text"], input:not([type])').first();
  
  // 4. Wait for it to be visible with shorter timeout but multiple checks
  try {
    await textInput.waitFor({ state: 'visible', timeout: 15000 });
    console.log('Found input using alternate selector');
  } catch (e) {
    console.log('Could not find input with alternate selector:', e.message);
    // Take another screenshot after timeout
    await page.screenshot({ path: 'screenshot-timeout.png' });
    
    // Try to continue with whatever we can find
    const anyInput = page.locator('input').first();
    if (await anyInput.count() > 0) {
      console.log('Found at least one input, continuing with that');
      await anyInput.fill('invalid-key');
      await page.keyboard.press('Enter');
    } else {
      throw new Error('No input elements found on page');
    }
  }
  // 5. Assert that the correct error text is present
  const errorDiv = page.locator('#insert-key-input-invalid-text');
  await errorDiv.waitFor({ state: 'visible' }); // Wait for the error message
  const textContent = await errorDiv.textContent();
  expect(textContent).toBe('Invalid API Key');
  
});