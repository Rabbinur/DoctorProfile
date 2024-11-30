const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 100,
  max: 100,
  message: `Too many requests form this ip,please try again letter`,
});

module.exports = { limiter };
