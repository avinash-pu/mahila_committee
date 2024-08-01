const User = require('../modal/user'); // corrected 'odal' to 'odels'
const jwt = require('jsonwebtoken'); // added jwt requirement
const generateToken = require('../utils/generateToken');

module.exports = {
  register: async (req, res) => {
    const { name, mobile, password } = req.body;
    const user = new User({ name, mobile, password });
    try {
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Error creating user' });
    }
  },

  login: async (req, res) => {
    const { mobile, password } = req.body;
    try {
      const user = await User.findOne({ mobile });
      if (!user) {
        res.status(401).json({ message: 'Invalid mobile number' });
      } else {
        const isValid = await user.comparePassword(password);
        if (!isValid) {
          res.status(401).json({ message: 'Invalid password' });
        } else {
          // replaced jwt.sign with generateToken
          const token = generateToken(user._id);
          res.json({ token });
        }
      }
    } catch (err) {
      res.status(500).json({ message: 'Error logging in' });
    }
  },
};