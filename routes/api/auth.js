const express = require('express');
const router = express.Router(); // create a router instance
const auth = require('../../middleware/auth'); // import the auth middleware
const jwt = require('jsonwebtoken'); // to create json web tokens
const bcrypt = require('bcryptjs'); // to compare hashed passwords
const User = require('../../models/User'); // import the User model
const config = require('config'); // to get config variables
const { check, validationResult } = require('express-validator'); // to validate user input

// @route   GET api/auth
// @desc    Test route
// @access  Public // no authentication needed no token needed
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // find user by id and exclude password
    res.json(user); // send user data as json response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & Get token
// @access  Public // no authentication needed no token needed
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // send data to server in body of request and access it using req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const ismatch = await bcrypt.compare(password, user.password); // compare entered password with hashed password

      if (!ismatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentails' }] });
      }

      // return jsonwebtoken - bcz we want to log in right after registering
      const payload = {
        user: {
          id: user.id, // mongoose abstraction over _id
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token }); // return the token to the client
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router; // export the router to be used in other parts of the application
