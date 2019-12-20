const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route  GET api/v1/auth/
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      msg: 'Server Error'
    });
  }
});

// @route  POST api/v1/auth/
// @desc   Authenticate user & get token
// @access Public
router.post(
  '/',
  [
    // check if the email is valide or not
    check('email', 'Please include a valid email').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if the user exists
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid Credentials' }] });
      }

      // Matching the email & password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid Credentials' }] });
      }

      // Return the jsonWebToken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
