const express = require('express');
const path = require('path');

const router = express.Router();

const options = {
  root: path.join(__dirname, '../public'),
};
router.get('/', (req, res) => {
  res.sendFile('/pages/home.html', options);
});

module.exports = router;
