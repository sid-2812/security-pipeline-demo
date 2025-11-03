const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// A simple route
app.get('/', (req, res) => {
  res.send('Hello from Node App!');
});

// Intentionally risky route for testing ZAP
app.get('/user', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Hello ${name}`);  // Potential XSS injection test
});

app.listen(PORT, () => console.log(`Node app running on port ${PORT}`));
