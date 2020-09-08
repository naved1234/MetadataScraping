const express = require('express');
const {
  scrape,
} = require('../controllers/scraper');

const router = express.Router();

router
  .route('/')
  .post(scrape);

module.exports = router;