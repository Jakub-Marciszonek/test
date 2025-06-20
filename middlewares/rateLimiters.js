const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,// 15 min
  max: 100,//quantity of requests
  message: 'Too many requests, please try again later.'
});

const createEventLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,// 15 min
  max: 10,//quantity of requests
  message: 'Too many event creation attempts, please try again later.'
});

module.exports = { generalLimiter, createEventLimiter };
