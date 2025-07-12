const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Allow CORS for development (if frontend served separately)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// Simulated in-memory user database
const users = [];

// Serve main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'welcome.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/explore', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'explore.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html')); // If dashboard.html exists
});

// Signup handler
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.send(`<script>alert("User already exists!"); window.history.back();</script>`);
  }

  users.push({ username, email, password });
  console.log("✅ New user signed up:", { username, email });

  res.send(`<script>alert("Signup successful!"); window.location.href = "/login";</script>`);
});

// Login handler
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.send(`<script>alert("Login successful!"); window.location.href = "/dashboard";</script>`);
  } else {
    res.send(`<script>alert("Invalid credentials."); window.history.back();</script>`);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
