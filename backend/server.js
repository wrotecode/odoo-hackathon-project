const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// CORS Middleware (manually set headers)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static HTML files
app.use(express.static(path.join(__dirname, 'views')));

// Simulated user database
const users = [];

// Serve welcome page (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'welcome.html'));
});

// Routes for HTML pages (optional if using Live Server)
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Signup handler
app.post('/signup', (req, res) => {
  console.log("➡️ Received signup request");
  const { username, email, password } = req.body;
  console.log(req.body);

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.send(`<script>alert("User already exists!"); window.history.back();</script>`);
  }

  users.push({ username, email, password });
  console.log("✅ Users:", users);

  res.send(`<script>alert("Signup successful!"); window.location.href = "http://127.0.0.1:5500/views/login.html";</script>`);
});

// Login handler
app.post('/login', (req, res) => {
  console.log("➡️ Received login request");
  const { email, password } = req.body;
  console.log(req.body);

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.send(`<script>alert("Login successful!"); window.location.href = "http://127.0.0.1:5500/views/dashboard.html";</script>`);
  } else {
    res.send(`<script>alert("Invalid credentials."); window.history.back();</script>`);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
