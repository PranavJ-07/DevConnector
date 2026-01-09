const express = require('express');
const router = express.Router(); // create a router instance
const gravatar = require('gravatar'); // to get user gravatar
const bcrypt = require('bcryptjs'); // to hash passwords
const jwt = require('jsonwebtoken'); // to create json web tokens
const config = require('config'); // to get config variables
const { check, validationResult } = require('express-validator'); // to validate user input

const User = require('../../models/User'); // import the User model

// @route   POST api/users
// @desc    Register user
// @access  Public // no authentication needed no token needed
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    // send data to server in body of request and access it using req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already Exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm', // default
      });

      user = new User({
        // create a new user instance call user.save() to save to db
        name,
        email,
        avatar,
        password, // not hashed yet
      });

      const salt = await bcrypt.genSalt(10); // generate salt for hashing

      user.password = await bcrypt.hash(password, salt); // hash the password

      await user.save(); // save the user to the database
      // anything that returns a promise we await

      // get users gravatar

      // encrypt password before saving to database

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
