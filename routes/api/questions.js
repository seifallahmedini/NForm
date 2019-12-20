const express = require('express');

const router = express.Router();

// @route  GET api/v1/question/
// @desc   Test route
// @access Public
router.get('/', (req, res) => {
  res.send('Question route');
});

module.exports = router;
