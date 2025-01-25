const User = require('../models/User');

module.exports = (app) => {
  // Register
  app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
      const user = new User({ username, password, role });
      await user.save();
      res.status(201).send('User registered');
    } catch (err) {
      res.status(400).send('Error registering user');
    }
  });

  // Login
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).send('User not found');
      if (user.password !== password) return res.status(400).send('Invalid credentials');
      res.status(200).send('Login successful');
    } catch (err) {
      res.status(400).send('Error logging in');
    }
  });
};
