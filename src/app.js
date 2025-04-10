const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Basic routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Node App</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #333; }
          .container { max-width: 800px; margin: 0 auto; }
          .btn { padding: 10px 15px; background: #0078d7; color: white; border: none; border-radius: 4px; cursor: pointer; }
          .btn:hover { background: #0069c0; }
          #counter { font-size: 24px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to My Node App</h1>
          <p>This is a simple app to demonstrate Playwright testing with GitHub Actions.</p>
          <div>
            <h2>Counter Example:</h2>
            <div id="counter">0</div>
            <button id="increment-btn" class="btn">Increment</button>
          </div>
        </div>
        <script>
          let count = 0;
          const counterEl = document.getElementById('counter');
          const btnEl = document.getElementById('increment-btn');
          
          btnEl.addEventListener('click', () => {
            count++;
            counterEl.textContent = count;
          });
        </script>
      </body>
    </html>
  `);
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export for testing
module.exports = app;
