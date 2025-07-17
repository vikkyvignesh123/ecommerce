const User = require('../model/user');

const bcrypt = require('bcryptjs');
// controllers/auth.js


const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

      res.status(200).json({ success: true, message: 'User registered successfully', username });
  }
   catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    // Send success response
    res.status(200).json({ success: true, message: 'Login successful', username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

module.exports = { register, login };
