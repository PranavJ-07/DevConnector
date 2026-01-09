const express = require('express');
const router = express.Router(); // create a router instance

// @route   GET api/profile
// @desc    Test route
// @access  Public // no authentication needed no token needed
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router; // export the router to be used in other parts of the application
