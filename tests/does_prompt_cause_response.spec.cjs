const { test, expect } = require('@playwright/test');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

test('Does prompt cause response', async ({ page }) => {


    console.log("OPENAI_API_KEY", OPENAI_API_KEY);
    console.log("test name: does_prompt_cause_response");
  
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
console.log('page.waitForLoadState');
await page.waitForLoadState('networkidle');


// Get the element with ID 'messages'
console.log('Get the element with ID after load');
const messagesDiv1 = await page.$('#messages');
console.log("messagesDiv1", messagesDiv1);


// count the number of div children before entering prompt
// const childDivCountBeforePrompt = await messagesDiv.$$eval('div', divs => divs.length);
// console.log(`Number of child divs before prompt: ${childDivCountBeforePrompt}`);

// Type text into the contenteditable div
// await page.locator('#text-input').type('Your text here');
console.log('fill');
await page.locator('#text-input').fill('Your text here');


console.log('Get the element with ID after fill');
const messagesDiv2 = await page.$('#messages');
console.log("messagesDiv after fill", messagesDiv2);

// Click the button with the specified selector
console.log('Click the button');
await page.locator('#input > div:nth-child(5) > div').click();


console.log('Get the element with ID after fill');
const messagesDiv3 = await page.$('#messages');
console.log("messagesDiv after click", messagesDiv3);

// Get the element with ID 'messages'
console.log('Get the element with ID');
const messagesDiv = await page.$('#messages');



  // Count the number of direct div children after prompt
  console.log('Count the number of direct div children');
  const childDivCount = await messagesDiv.$$eval('div', divs => divs.length);

  // Log the count
  console.log(`Number of child divs after prompt: ${childDivCount}`);

  // Optional: Add an assertion if you expect a specific number of children
  expect(childDivCount).toBeGreaterThan(0); // or use .toBe(expectedNumber)



//   // 5. Assert that the error text is NOT present
//   const isVisible = await page.locator('#insert-key-input-invalid-text').isVisible();
//   expect(isVisible).toBe(false);
  
});