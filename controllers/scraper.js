const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Meta = require('html-metadata-parser');
const NodeCache = require( "node-cache" );
const cache = new NodeCache( { stdTTL: 1000, checkperiod: 500 } );

// @desc      Scrape data from url
// @route     POST /api/v1/scrape
// @access    Public

exports.scrape = asyncHandler(async (req, res, next) => {
  const {url} = req.body;
  let result = {};

  if (!url) {
    return next(new ErrorResponse('Please provide a url', 400));
  }

  else if (typeof url !== 'string') {
    return next(new ErrorResponse('url should be a string', 400));
  }

  else if (url.length === 0) {
    return next(new ErrorResponse('url string should not be empty', 400));
  }

  if (cache.has(url)) {
    result = cache.get(url);
  } else {
    result = await Meta.parser(url);
    cache.set(url, result);
  }

  res.status(200).json({
    success: true,
    data: result
  });
});