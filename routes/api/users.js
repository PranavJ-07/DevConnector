const express = require('express');
const router = express.Router();

// @route     POSTS api/users
// @desc      Resister route
// @access    Public
router.post('/', (req, res) => {
    console.log(req.body);
    res.send('User Route');
});

module.exports = router;