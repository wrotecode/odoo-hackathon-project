const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, images) from /views
app.use(express.static(path.join(__dirname, 'views')));

// In-memory "databases"
const users = [];
const profiles = {}; // Keyed by username or email

// Routes for main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'welcome.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/edit-profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'edit-profile.html'));
});

app.get('/request', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'request.html'));
});


app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Handle signup
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.send(`<script>alert("User already exists!"); window.history.back();</script>`);
  }

  users.push({ username, email, password });
  res.send(`<script>alert("Signup successful!"); window.location.href = "/login";</script>`);
});

// Handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Redirect to edit profile on successful login
    res.send(`<script>alert("Login successful!"); window.location.href = "/edit-profile";</script>`);
  } else {
    res.send(`<script>alert("Invalid credentials."); window.history.back();</script>`);
  }
});

// Handle profile update (Edit Profile Save button)
app.post('/api/user/update', (req, res) => {
  const profileData = req.body;

  // Optional: validate profileData fields
  if (!profileData.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Simulate saving by name
  profiles[profileData.name] = profileData;

  console.log('✅ Profile updated:', profileData);
  res.json({ message: 'Profile saved successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
