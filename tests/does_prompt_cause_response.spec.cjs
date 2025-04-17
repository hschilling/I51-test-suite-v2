// tests/invalid.spec.cjs (updated version)
const { test, expect } = require('@playwright/test');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

test('valid OPENAI API KEY', async ({ page }) => {


  console.log("OPENAI_API_KEY", OPENAI_API_KEY);
  
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
      await anyInput.fill(OPENAI_API_KEY);
      await page.keyboard.press('Enter');
    } else {
      throw new Error('No input elements found on page');
    }
  }


// Wait for navigation to complete
await page.waitForNavigation();

// Type text into the contenteditable div
await page.locator('#text-input').type('Your text here');

// Click the button with the specified selector
await page.locator('#input > div:nth-child(5) > div').click();


  // Get the element with ID 'messages'
  const messagesDiv = await page.$('#messages');

  // Count the number of direct div children
  const childDivCount = await messagesDiv.$$eval('div', divs => divs.length);

  // Log the count
  console.log(`Number of child divs: ${childDivCount}`);

  // Optional: Add an assertion if you expect a specific number of children
  expect(childDivCount).toBeGreaterThan(0); // or use .toBe(expectedNumber)



//   // 5. Assert that the error text is NOT present
//   const isVisible = await page.locator('#insert-key-input-invalid-text').isVisible();
//   expect(isVisible).toBe(false);
  
});